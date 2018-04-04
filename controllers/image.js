const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "f276c2d015c6442fa88e8f7684c54a3a"
});

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with api'));
}
const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
