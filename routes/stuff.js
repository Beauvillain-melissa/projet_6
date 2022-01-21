const express = require('express');
const multer = require('multer');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');


  router.get('/sauces' ,stuffCtrl.getAllSauce );
  router.get( '/sauces/:id', stuffCtrl.getOneSauce); 
  router.post( '/sauces',multer , stuffCtrl.postCreatSauce);
  
//router.put('/:id' ,auth, multer ,stuffCtrl.modifyThing);
  //router.delete('/:id',auth ,stuffCtrl.deleteThing);


module.exports = router;