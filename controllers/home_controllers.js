// create and export upload controller for uploading file to s3 bucket and metadata to mongoDB
module.exports.upload = (req, res) => {
    const filePath = req.file.location;
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.insertOne({ filePath: filePath, ...req.file, ...req.body }).then(result => {
        return res.json({ status: 'success', result: result });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
};