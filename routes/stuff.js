const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


  router.get('/sauces' ,stuffCtrl.getAllSauce );
  router.get( '/sauces/:id', stuffCtrl.getOneSauce); 
  router.post( '/sauces', multer, stuffCtrl.postCreatSauce);
  router.put('/sauces/:id', multer, stuffCtrl.updateSauce);
  router.post('/sauces/:id/like',multer,stuffCtrl.AddLikes);
  router.delete('/sauces/:id',multer,stuffCtrl,deleteOne);
 

module.exports = router;