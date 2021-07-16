const router = require('express').Router();
let Generic = require('../models/generic.model');

router.get('/', async (req, res) => {
  try {
    const generic = await Generic.find();
    res.json(generic)

  } catch(err) {
    res.status(400).json('error')
  }

});

router.route('/add').post((req, res) => {
  const genericName = req.body.genericName;

  const newGeneric = new Generic({genericName});

  newGeneric.save()
    .then(() => res.json('generic added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', async (req, res) => {
  try {
    const update = {
        genericName: req.body.genericName,
       
    }   
    const generic = await Generic.findByIdAndUpdate(req.params.id, update, { new: true }); // return new updated product
    res.json(generic)
  } catch(err) {
    res.status(400).json('error')
    
  }

});

router.delete('/delete/:id', async (req, res) =>{
  try {
    await Generic.findByIdAndDelete(req.params.id)
    res.json('Generic deleted!')

  } catch(err) {
    res.status(400).json('error')
    
  }

});

module.exports = router;
