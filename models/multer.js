// require multer and multers3
const multer = require('multer');
const multers3 = require('multer-s3');

// require aws-sdk
const aws = require('aws-sdk');

// require uuid from node-uuid
const uuid = require('uuid').v4;

// require path from node-path
const path = require('path');

// create s3 instance
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// create the multer which has storage of multer-s3 and multers3 has bucket name technothon69
const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'technothon69',
        // create acl key with value public-read
        acl: 'public-read',
        // create metadata key with value fieldName
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        // create key
        key: function (req, file, cb) {
            // create constant ext and assign it to file.originalname
            const ext = path.extname(file.originalname);
            // call the cb function with the uuid instance and ext
            cb(null, uuid() + ext);
        }
    })
});

// export upload
module.exports = upload;