const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require ('path');

const Utilisateur = require('./models/utilisateur');
const sauce = require('./models/sauce');


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

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//requete POST+ api signup manque hachage(inscription)
app.post('/api/auth/signup', (req, res, next) => {    
  delete req.body._id;
  const thing = new Utilisateur({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});
//-------------------------------------------------------------------------------------------------------------------------------------
//requete POST +api login
app.post('/api/auth/login', (req, res, next) => {
    //shéma de données pour la base de données    
    Utilisateur.findOne({ email: req.body.email, password: req.body.password })
    .then(utilisateur => {
      if(utilisateur != null) {
        res.status(200).json(utilisateur);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé !' });
      }
      
    })
    .catch(error => res.status(404).json({ error }));
  });
//----------------------------------------------------------------------------------------------------------------------------------------------
// GET + api retourne le tableau des sauces
app.get('/api/sauces', (req, res, next) => {
    sauce.find({})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
});
//-------------------------------------------------------------------------------------------------------------------------------------------
//GET + API + renvoie LA sauce avce l'id
app.get('/api/sauces/:id', (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
//------------------------------------------------------------------------------------------------------------------------------------
//POST+verb
app.post('/api/sauces', (req, res, next) => {   
  console.log(req);
  console.log(req.params);
  res.status(400).json({ });
  //delete req.body._id;
  //const thing = new Utilisateur({
   // ...req.body
  //});
  //thing.save()
    //.then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
    //.catch(error => res.status(400).json({ error }));
});





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