const File = require('../domain/models/file.model');

const uploadFile = async (fileData) => {
  try {
    await new File(fileData).save();
  } catch (err) {
    return err.message;
  }
};

module.exports = { uploadFile };
