const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: 'File too large. Max 5MB allowed'
      });
    }
  
    if (err.message.includes('XML parsing failed')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid XML format'
      });
    }
  
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  };
  
  module.exports = { errorHandler };