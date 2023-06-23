// create and export a search controller for fetching all the files from db
module.exports.search = (req, res) => {
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.find({}).toArray().then(files => {
        return res.json({ status: 'success', files: files });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
};

// create and export a search controller for fetching the files from db by the searhTerm as params in request
module.exports.searchByTerm = (req, res) => {
    const search = req.params.searchTerm;
    const technothonCollection = req.app.locals.technothonCollection;
    technothonCollection.find({ originalname: { $regex : search } }).toArray().then(files => {
        return res.json({ status: 'success', files: files });
    }).catch(err => {
        return res.json({ status: 'error', message: err });
    });
};