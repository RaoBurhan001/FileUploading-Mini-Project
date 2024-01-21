require('dotenv').config();
// Load environment variables from .env file
const env = process.env;

const s3ClientConfig = {
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
};

module.exports = { s3ClientConfig };
