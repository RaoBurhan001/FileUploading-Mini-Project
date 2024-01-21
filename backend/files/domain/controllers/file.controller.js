const fileService = require('../services/file.service')

const getPreSignedUrl = (req,res) => {
const key= req.params
const preSignedUrl = fileService.getPreSignedUrl(key)
return res.status(200).send(preSignedUrl)
}

const putPreSignedUrl = (req, res) => {
  const { fileName, contentType } = req.body;
  const preSignedUrl = fileService.putPreSignedUrl(fileName, contentType);
  return res.status(200).send(preSignedUrl);
};

const deletePreSignedUrl = (req, res) => {
  const { fileName } = req.params;
  const preSignedUrl = fileService.deletePreSignedUrl(fileName);
  return res.status(200).send(preSignedUrl);
};
const uploadImage = async (req, res) => {
  try {
    const { fileName ,  contentType } = req.body;
    const saveFileData = await fileService.uploadFile(fileName, contentType);
    return res.status(200).send(saveFileData);
  } catch (err) {
    return err.message;
  }
};

const getAllFiles = async (req, res) => {
  try {
    const getFileData = await fileService.getAllFiles();
    return res.status(200).send(getFileData);
  } catch (err) {
    return err.message;
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFile = await fileService.deleteFile(id);
    return res.status(200).send(deletedFile);
  } catch (err) {
    return err.message;
  }
};
module.exports = {
    getPreSignedUrl,
    putPreSignedUrl,
    deletePreSignedUrl,
    uploadImage,
    getAllFiles,
    deleteFile
}