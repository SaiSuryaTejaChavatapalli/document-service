// import home_controllers from home_controllers
const home_controllers = require('../controllers/home_controllers');
// import delete_controllers from delete_controllers.js in controllers folder
const delete_controllers = require('../controllers/delete_controllers');
// create a router for home_controllers by importing Router from express.
const home_router = require('express').Router();
// require search_router from search.js
const search_router = require('./search');
// require upload from the multer from models folder.
const upload = require('../models/multer');
// require scanFile from clamscan in config folder.
const scanFile = require('../config/clamscan');
// require cors from cors and make home_router use it.
const cors = require('cors');
home_router.use(cors());

// make home_router use search_router
home_router.use('/search', search_router);

// create a route for uploading file along the metadata using the upload controller from home_controllers
home_router.post('/upload', upload.single('file'), home_controllers.upload);

// create a route for deleting the filedata from database using the delete controller from home_controllers
home_router.get('/delete/:fileName', delete_controllers.deleteFile);

// export home_router to be used in other files.
module.exports = home_router;