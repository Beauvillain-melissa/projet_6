const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


  router.get('/sauces', auth, stuffCtrl.getAllSauce );
  router.get( '/sauces/:id', auth,stuffCtrl.getOneSauce); 
  router.post( '/sauces', multer, auth,stuffCtrl.postCreatSauce);
  router.put('/sauces/:id', multer, auth,stuffCtrl.updateSauce);
  router.post('/sauces/:id/like',multer, auth,stuffCtrl.addLikes);
  router.delete('/sauces/:id',multer, auth, stuffCtrl.deleteOne);
 

module.exports = router;