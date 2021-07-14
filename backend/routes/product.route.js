const router = require('express').Router();
let Product = require('../models/products.model');

router.get('/', async (req, res) => {
    try{
      const products = await Product.find();
      res.json(products)
    }catch(err) {
        res.status(400).json('error')
    }
});

router.route('/add').post((req, res) => {
  const newProduct = new Product(req.body);

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/delete/:id', async (req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.json('Product deleted!')
    }catch(err){
        res.status(400).json('error')
    }

});

router.put('/update/:id', async (req, res) => {
  try{
    const update = {
        genericName: req.body.genericName,
        brandName: req.body.brandName,
        price: req.body.price,
        dosage: req.body.dosage,
    }   
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true }); // return new updated product
    res.json(product)

  }catch(err){
      res.status(400).json('error')
  }

});

module.exports = router;
