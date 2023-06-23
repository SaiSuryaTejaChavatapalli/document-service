// require express.Router and add it to the constant search_router
const search_router = require('express').Router();

// require cors and add it to the constant search_router
const cors = require('cors');
search_router.use(cors());

// require search_controllers from controllers folder
const search_controllers = require('../controllers/search_controllers');

// create a get request for / and call the search function in search_controller
search_router.get('/', search_controllers.search);

// create a get request for /:searchTerm and call the searchByTerm function in search_controller
search_router.get('/:searchTerm', search_controllers.searchByTerm);

// export search_router
module.exports = search_router;