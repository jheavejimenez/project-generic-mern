const router = require('express').Router();
let User = require('../models/users.model');

router.get('/', async (req, res) =>  {
  try{
    const user = await User.find();
    res.json(user);

  }catch(err){
    res.status(400).json('error')

  }
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', async (req, res) => {
  try{
    const update = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,

    }

  }catch(err){
    res.status(400).json('error')

  }
  
});

router.delete('/delete/:id', async (req, res) =>{
  try{
    await User.findByIdAndDelete(req.params.id)
    res.json('Generic deleted!')

  }catch(err){
    res.status(400).json('error')
    
  }

});

module.exports = router;
