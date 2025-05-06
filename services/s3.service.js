const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ 
  region: process.env.AWS_REGION 
});

const s3 = new AWS.S3();

exports.uploadToS3 = async ({ originalName, buffer, mimetype }) => {
  const fileKey = `${uuidv4()}-${originalName.replace('.xml', '.json')}`;
  
  await s3.upload({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'private' 
  }).promise();

  const presignedUrl = s3.getSignedUrl('getObject', {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Expires: 60 * 5 
  });

  return { 
    fileKey, 
    presignedUrl 
  };
};
