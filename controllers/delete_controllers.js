// import s3 from ../models/multer.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.deleteFile = (req, res) => {
    const key = req.params.key;
    const technothonCollection = req.app.locals.technothonCollection;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };
    try {
        s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log({ status: 'error', message: err });
            } else {
                console.log({ status: 'success', result: data });
            }
        });
        technothonCollection.deleteOne({ key: key }).then(result => {
            return res.json({ status: 'success', result: result });
        }).catch(err => {
            return res.json({ status: 'error', message: err });
        });
    } catch (err) {
        console.log(err,'Error deleting object')
    }
};