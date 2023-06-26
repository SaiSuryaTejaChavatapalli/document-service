const s3 = require('../models/multer');
module.exports.deleteFile = (req, res) => {
    const key = req.params.key;
    const technothonCollection = req.app.locals.technothonCollection;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };
    s3.deleteObject(params, function (err, data) {
        if (err) {
            return res.json({ status: 'error', message: err });
        }
        return res.json({ status: 'success', result: data });
    });
    technothonCollection.deleteOne({ key: key }).then(result => {
        return res.json({ status: 'success', result: result });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
};