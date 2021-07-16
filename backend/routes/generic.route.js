const router = require('express').Router();
let Generic = require('../models/generic.model');

router.route('/').get(async (req, res) => {
  try {
    const searchQuery = req.query.q
    const filter = searchQuery ? {
      genericName: {$regex: `${searchQuery}`, $options: 'i'},
    } : {};
    const generic = await Generic.find(filter);
    res.json(generic)

  } catch (err) {
    res.status(400).json('error')
  }

}).post((req, res) => {
  const genericName = req.body.genericName;

  const newGeneric = new Generic({genericName});

  newGeneric.save()
    .then(() => res.json(newGeneric))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put(async (req, res) => {
  try {
    const update = {
      genericName: req.body.genericName,

    }
    const generic = await Generic.findByIdAndUpdate(req.params.id, update, {new: true}); // return new updated product
    res.json(generic)
  } catch (err) {
    res.status(400).json('error')

  }

}).delete(async (req, res) => {
  try {
    await Generic.findByIdAndDelete(req.params.id)
    res.json('Generic deleted!')

  } catch (err) {
    res.status(400).json('error')

  }

});

module.exports = router;
