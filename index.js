// call config method to load environment variables from .env file.
require('dotenv').config();
// require express, cors
const express = require('express');
const cors = require('cors');

// require home_router from home.js in routes folder
const home_router = require('./routes/home');

// create express app
const app = express();

// export app
module.exports = app;

// require mongo from mongodb in config folder
require('./config/mongodb');

// add middleware to use statics from views folder
// app.use(express.static('views'));

// make app use cors
app.use(cors());

// make app use home_router
app.use('/', home_router);

// app.use(express.static('views'));

//write code to run the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
