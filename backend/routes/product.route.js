const router = require('express').Router();
let Product = require('../models/products.model');
let Generic = require('../models/generic.model');

router.route('/').get(async (req, res) => {
  try {
    const searchQuery = req.query.q
    const genericIds = searchQuery ? await Generic.find({
      genericName: {$regex: `${searchQuery}`, $options: 'i'}
    }) : [];
    const filter = searchQuery ? {
      $or: [{
        brandName: {$regex: `${searchQuery}`, $options: 'i'},
      }, {
        genericName: {$in: genericIds}
      }]
    } : {};
    const products = await Product.find(filter).populate('genericName');
    res.json(products)
  } catch (err) {
    res.status(400).json('error')
  }
}).post((req, res) => {
  const newProduct = new Product(req.body);

  newProduct.save()
    .then(() => res.json(newProduct))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put(async (req, res) => {
  try {
    console.log(req.body);
    const {genericName, brandName, price, dosage} = req.body;
    console.log(genericName);
    const update = {genericName, brandName, price, dosage};
    const product = await Product.findByIdAndUpdate(req.params.id, update, {new: true});
    res.json(product)
  } catch (err) {
    console.log(err);
    res.status(400).json('error')
  }
}).delete(async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json('Product deleted!')
  } catch (err) {
    res.status(400).json('error')
  }

});


module.exports = router;
