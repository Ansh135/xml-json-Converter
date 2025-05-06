const { performance } = require('perf_hooks');
const fs = require('fs');
const crypto = require('crypto');

class PerformanceTracker {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      successCount: 0,
      errorCount: 0,
      dataCorruptionCount: 0,
      totalProcessingTime: 0,
      xml2jsTime: 0,
      s3UploadTime: 0
    };
  }

  startTracking() {
    return {
      startTime: performance.now(),
      end: () => {
        const elapsed = performance.now() - this.startTime;
        this.metrics.totalProcessingTime += elapsed;
        return elapsed;
      }
    };
  }

  async verifyDataIntegrity(originalXML, convertedJSON) {
    try {
      const normalizedXML = originalXML
        .replace(/>\s+</g, '><') 
        .replace(/\s+/g, ' ')    
        .trim();
  
      const builder = new xml2js.Builder();
      const reconstructedXML = builder.buildObject(convertedJSON);
      
      return normalizedXML === reconstructedXML;
    } catch (err) {
      console.error('Integrity check failed:', err);
      return false;
    }
  }

  generateReport() {
    const report = {
      ...this.metrics,
      successRate: `${(this.metrics.successCount / this.metrics.totalRequests * 100).toFixed(1)}%`,
      xml2jsPercentage: `${(this.metrics.xml2jsTime / this.metrics.totalProcessingTime * 100).toFixed(1)}%`,
      timestamp: new Date().toISOString()
    };
    fs.writeFileSync('performance-report.json', JSON.stringify(report, null, 2));
    return report;
  }
}

module.exports = new PerformanceTracker();