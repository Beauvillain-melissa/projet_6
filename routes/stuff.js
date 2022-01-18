const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');


  router.get('/api/sauces' ,auth ,stuffCtrl.getAllSauce );
  router.get( '/api/sauces/:id',auth, stuffCtrl.getOneSauce); 
  //router.post( '/api/sauces',auth , stuffCtrl.);
  
//router.put('/:id' ,auth, multer ,stuffCtrl.modifyThing);
  //router.delete('/:id',auth ,stuffCtrl.deleteThing);


module.exports = router;