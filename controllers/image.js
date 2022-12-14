const Clarifai = require('clarifai') 

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'c6e0123a2dc640f4884b8959dd5a47d0'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with Api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
    handleImage,
    handleApiCall
}