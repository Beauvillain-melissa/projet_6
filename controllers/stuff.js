const express = require('express');
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



  //sauce.findOne({ _id: req.params.id })
    //.then(thing => res.status(200).json(thing))
    //.catch(error => res.status(404).json({ error }));