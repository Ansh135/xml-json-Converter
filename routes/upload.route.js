const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const upload = require('../config/multer.config');

router.post('/', upload.single('xmlFile'), uploadController.processUpload);
module.exports = router;