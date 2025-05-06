require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }); 

const uploadRoute = require('./routes/upload.route');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/upload', uploadRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`File is uploaded from: ${path.join(__dirname, 'public')}`);
  console.log(`Running on URL: http://localhost:${PORT}`);
});




const tracker = require('./utils/performance-tracker');

app.post('/api/upload', upload.single('xmlFile'), async (req, res) => {
  tracker.startTracking();
  const xmlPhase = tracker.trackPhase('xml2js');
  
  try {
    const fileReadPhase = tracker.trackPhase('fileRead');
    const xmlData = fs.readFileSync(req.file.path, 'utf-8');
    fileReadPhase.end();

    const jsonData = await xml2js.parseStringPromise(xmlData);
    xmlPhase.end();

    const isValid = await tracker.verifyDataIntegrity(xmlData, jsonData);
    if (!isValid) throw new Error('Data corruption detected');

    const s3Phase = tracker.trackPhase('s3Upload');
    await s3.upload({ /* params */ }).promise();
    s3Phase.end();

    tracker.metrics.successCount++;
    res.json({ success: true });

  } catch (err) {
    tracker.metrics.errorCount++;
    res.status(500).json({ error: err.message });
  } finally {
    tracker.metrics.totalRequests++;
    performance.mark('end');
    performance.measure('totalTime', 'start', 'end');
    tracker.generateReport(); // Auto-saves to performance-report.json
  }
});