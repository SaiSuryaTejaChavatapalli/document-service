require('dotenv').config();
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const uuid = require('uuid').v4;
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());

MongoClient.connect(process.env.DBURL, { useNewUrlParser: true })
.then(client => {
    console.log('Connected to Database');
    const db = client.db('technothon');
    const technothonCollection = db.collection('files');
    app.locals.technothonCollection = technothonCollection;
});

const s3 = new aws.S3({ apiVersion: '2010-12-01' });

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'technothon69',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});

// app.use(express.static('public'));

// create a route for uploading file along the metadata
app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.location;
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.insertOne({ filePath: filePath, ...req.file, ...req.body }).then(result => {
        return res.json({ status: 'success', result: result });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
});

// create a route for fetching all the files
app.get('/search', (req, res) => {
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.find({}).toArray().then(files => {
        return res.json({ status: 'success', files: files });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
});


// create a route that takes parameter searchTerm and returns the files that match the searchTerm
app.get('/search/:searchTerm', (req, res) => {
    const search = req.params.searchTerm;
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.find({ originalname: { $regex : search } }).toArray().then(files => {
        return res.json({ status: 'success', files: files });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
});


// create a route for searching and fetching files based on the user input
// app.get('/search/:searchTerm', (req, res) => {
//     const search = req.params.searchTerm;
//     const technothonCollection = req.app.locals.technothonCollection;
//     technothonCollection.find({ 
//         $or: [
//             { $where: `JSON.stringify(this).includes('${search}')` },
//             Object.entries({ $where: `Object.values(this).some(val => String(val).includes('${search}'))` }).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
//         ]
//     }).toArray().then(files => {
//         return res.json({ status: 'success', files: files });
//     }).catch(err => {
//         return res.json({ status: 'error', message: err });
//     });
// });

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