// require MongoClient function from mongodb module
const { MongoClient } = require('mongodb');

// require app from index.js
const app = require('../index');

// create a connection string using the connection string DBURL from the environment variables
const connectionString = process.env.DBURL;

// call connect method to connect to the database using the connection string and the name of the database as 'technothon' if the promise is resolved then console 'Connected to Database' else console 'Error connecting to Database'
const mongo = MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        // assign the database object to the 'technothon' constant
        const technothon = client.db('technothon');
        // create a collection object using the collection name 'files'
        app.locals.technothonCollection = technothon.collection('files');
        // store files collection object in the app.locals object as technothonCollection
    })
    .catch(error => {
        console.log('Error connecting to Database');
        console.log(error);
    });

// export the mongo variable
module.exports = mongo;