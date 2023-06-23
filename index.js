// call config method to load environment variables from .env file.
require('dotenv').config();
// require express, cors
const express = require('express');
const cors = require('cors');

// require home_router from home.js in routes folder
const home_router = require('./routes/home');

// create express app
const app = express();

// add middleware to use statics from views folder
// app.use(express.static('views'));

// make app use cors
app.use(cors());

// make app use home_router
app.use('/', home_router);

// app.use(express.static('public'));

// create a route for deleting files
// below router is deleting file data from mongodb but files in s3 are not deleted
// app.delete('/delete/:fileName', (req, res) => {
//     const fileName = req.params.fileName;
//     const technothonCollection = req.app.locals.technothonCollection;
//     technothonCollection.deleteOne({ originalname: fileName }).then(result => {
//         return res.json({ status: 'success', result: result });
//     }).catch(err => {
//         return res.json({ status: 'error', message: err });
//     });
// });

//write code to run the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});

// export app
module.exports = app;

// require mongo from mongodb in config folder
require('./config/mongodb');