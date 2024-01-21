const { S3Client, GetObjectCommand, PutObjectCommand , DeleteObjectCommand , ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const fileRepository = require('../../data-access/fileRepository')
const { s3ClientConfig } = require('../../../config/s3Config')
// Load environment variables from .env file
const env = process.env

// Create an S3 client
const s3Client = new S3Client({
  s3ClientConfig
});
const generateUniqueKey = (fileName) => {
  const timestamp = Date.now(); // Get current timestamp
  const randomString = uuidv4(); // Generate a random string using uuid

  return `${timestamp}-${randomString}-${fileName}`;
};
// Function to generate a pre-signed URL for getting an object
const getPreSignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // Adjust expiresIn as needed
  return url;
};
// Function to get the presigned url for uploading te object
const putPreSignedUrl =async(key, contentType)=>{

  const command = new PutObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: key,
    ContentType: contentType
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // Adjust expiresIn as needed
  console.log('🚀 ~ putPreSignedUrl ~ url:', url)
  return url
}
const deletePreSignedUrl =async(fileName)=>{
  const command = new DeleteObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: fileName,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // Adjust expiresIn as needed
  return url
}

const getAllImagesSignedUrl = async ()=>{
  // Create a pre-signed URL for listing objects in the bucket
const command = new ListObjectsV2Command({
  Bucket:  env.BUCKET_NAME,
});
const response = await s3Client.send(command);
console.log('🚀 ~ getAllImagesSignedUrl ~ response:', response)

let objects = response.Contents.map(obj => obj.Key);
objects = Promise.all(objects.map(obj=> getPreSignedUrl(obj)))
console.log('🚀 ~ getAllImagesSignedUrl ~ objects:', objects)
return objects
}

const uploadFile = async (fileName, contentType) => {
  try {
    const key = generateUniqueKey(fileName);
    const url = await putPreSignedUrl(key, contentType);
    const fileBody = {
      name: key,
      contentType,
      originalName: fileName,
    };
    await fileRepository.uploadFile(fileBody);
    return url;
  } catch (err) {
    return err.message;
  }
};
const getAllFiles = async () => {
  try {
    const url = await getAllImagesSignedUrl();
    console.log('🚀 ~ getAllFiles ~ url:', url)
    return url;
  } catch (err) {
    return err.message;
  }
};

const deleteFile = async (fileName) => {
  try {
    const url = await deletePreSignedUrl(fileName);
    return url;
  } catch (err) {
    return err.message;
  }
};

module.exports = { getPreSignedUrl , putPreSignedUrl , deletePreSignedUrl , uploadFile , getAllFiles , deleteFile };