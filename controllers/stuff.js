const express = require('express');
const sauce = require('../models/sauce');
const Sauce = require('../models/sauce');

exports.getAllSauce = (req, res, next) => {
  Sauce.find({})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};


exports.postCreatSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat: sauceObject.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
  let sauceObject = null;

  if (req.body.sauce === undefined) {
    sauceObject = req.body;
    Sauce.updateOne(
      { _id: req.params.id }, {
      userId: sauceObject.userId,
      name: sauceObject.name,
      manufacturer: sauceObject.manufacturer,
      description: sauceObject.description,
      mainPepper: sauceObject.mainPepper,
      heat: sauceObject.heat
    }
    )
      .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
      .catch(error => res.status(400).json({ error }));
  } else {
    sauceObject = JSON.parse(req.body.sauce);
    Sauce.updateOne(
      { _id: req.params.id }, {
      userId: sauceObject.userId,
      name: sauceObject.name,
      manufacturer: sauceObject.manufacturer,
      description: sauceObject.description,
      mainPepper: sauceObject.mainPepper,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      heat: sauceObject.heat
    }
    )
      .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.deleteOne = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.addLikes = (req, res, next) => {
  
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId);
        Sauce.updateOne(
          {_id: req.params.id }, {
            usersLiked: sauce.usersLiked,
            likes: sauce.likes + 1
          }
        ).then(() => res.status(200).json({ message: 'Sauce likée !' }))
        .catch(error => res.status(400).json({ error }));
      } else if(req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId);
        Sauce.updateOne(
          {_id: req.params.id }, {
            usersDisliked: sauce.usersDisliked,
            dislikes: sauce.dislikes + 1
          }
        ).then(() => res.status(200).json({ message: 'Sauce délikée !' }))
        .catch(error => res.status(400).json({ error }));
      } else {
        const index = sauce.usersLiked.indexOf(req.body.userId);
        const indexDislike = sauce.usersDisliked.indexOf(req.body.userId);
        if (index > -1) {
          sauce.usersLiked.splice(index, 1);
          sauce.likes = sauce.likes - 1;
        }
        if (indexDislike > -1) {
          sauce.usersDisliked.splice(indexDislike, 1);
          sauce.dislikes = sauce.dislikes - 1;
        }
        Sauce.updateOne(
          {_id: req.params.id }, {
            usersLiked: sauce.usersLiked,
            usersDisliked: sauce.usersDisliked,
            likes: sauce.likes,
            dislikes: sauce.likes
          }
        ).then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
      }
    
    })
    .catch(error => res.status(404).json({ error }));
};

