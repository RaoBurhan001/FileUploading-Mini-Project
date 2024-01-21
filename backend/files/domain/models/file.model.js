const mongoose = require('mongoose');

// Define the schema
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

// Create the model
const File = mongoose.model('File', fileSchema);

module.exports = File;
