const router = require('express').Router();
let Generic = require('../models/generic.model');

router.route('/').get((req, res) => {
  Generic.find()
    .then(generic => res.json(generic))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const genericName = req.body.genericName;

  const newGeneric = new Generic({genericName});

  newGeneric.save()
    .then(() => res.json('generic added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
