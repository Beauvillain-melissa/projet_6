const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require ('path');

const Utilisateur = require('./models/utilisateur');
const Sauce = require('./models/sauce');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/utilisateurs');



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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use ('/api/stuff',stuffRoutes);
app.use ('/api/auth',userRoutes);


//POST+verb cree et enregistre nvl sauce 
app.post('/api/sauces', multer, (req, res, next) => { 
  const sauceObject = JSON.parse(req.body.sauce);  

  const sauce = new Sauce({
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${path.join(__dirname, 'images')}/${req.file.filename}`,
    heat: sauceObject.heat,
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[],
  });

  thing.save()
    .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});
  //delete req.body._id;
  //const thing = new Utilisateur({
   // ...req.body
  //});
  
//});





//PUT mettre a jour avec id
app.put('/api/sauces/:id', (req, res, next) => {
  sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
//DELETE supprime avec id
app.delete('/api/sauces/:id', (req, res, next) => {
  sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});




module.exports = app;