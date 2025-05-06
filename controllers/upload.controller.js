const { convertXmlToJson } = require('../services/xml.service');
const { uploadToS3 } = require('../services/s3.service');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.processUpload = async (req, res, next) => {
    try {
      if (!req.file) throw new Error('No file uploaded');
      
      const jsonData = await convertXmlToJson(req.file.path);
      const { presignedUrl } = await uploadToS3({
        originalName: req.file.originalname,
        buffer: Buffer.from(JSON.stringify(jsonData)),
        mimetype: 'application/json'
      });
      
      await unlinkFile(req.file.path);
      
      res.json({
        success: true,
        message: 'File converted and uploaded successfully',
        downloadUrl: presignedUrl, 
        jsonPreview: jsonData 
      });
      
    } catch (err) {
      next(err);
    }
};