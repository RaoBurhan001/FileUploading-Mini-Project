const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();
const connectToMongoDB  = require('./config/dbConfig')

// parse json request body
app.use(express.json());
app.use(cors());

// Load environment variables from .env file
const env = process.env;

// Connect ot the database
connectToMongoDB();
// routes
app.use('/api', routes)
//Start te server
app.listen(4000, () => {
  console.log('listening on 4000');
});
