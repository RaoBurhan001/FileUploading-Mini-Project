const fileController = require('../domain/controllers/file.controller')
const express = require('express')
const router = express.Router()

router.get('/get-all', fileController.getAllFiles)
router.put('/upload-image', fileController.uploadImage)
router.delete('/delete-file/:id', fileController.deleteFile)

module.exports = router

