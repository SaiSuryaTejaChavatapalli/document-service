module.exports.deleteFile = (req, res) => {
    const fileName = req.params.fileName;
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.deleteOne({ originalname: fileName }).then(result => {
        return res.json({ status: 'success', result: result });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
};