const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const Utilisateur = require('./models/utilisateur');
const Sauce = require('./models/sauce');

const multer = require('./middleware/multer-config');

mongoose.connect('mongodb+srv://melissa:beauvillain@cluster0.gq4y2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/utilisateurs');
const req = require('express/lib/request');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', stuffRoutes);
app.use('/api/auth', userRoutes);



//DELETE supprime avec id

app.post('/api/sauces/:id/like', (req, res,next) => {
 Sauce.AddLikes()
  .then(() => res.status(200).json({ message: ' Likes ajoutées !' }))
  .catch(error => res.status(400).json({ error }));
});

module.exports = app;