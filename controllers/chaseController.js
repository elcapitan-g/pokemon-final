// src/controllers/chaseController.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DB_NAME = process.env.DB_NAME || 'pokemon';

// Get all chase cards
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db(DB_NAME).collection('chase').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single chase card by id
const getSingle = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db(DB_NAME).collection('chase').findOne({ _id: cardId });
    if (!result) return res.status(404).json({ error: 'Card not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new chase card
const createChase = async (req, res) => {
  try {
    const chaseCard = {
      name: req.body.name,
      set: req.body.set,
      psa10_price_usd: req.body.psa10_price_usd,
      year: req.body.year,
    };
    const response = await mongodb.getDatabase().db(DB_NAME).collection('chase').insertOne(chaseCard);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Error creating chase card.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update chase card by id
const updateChase = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const chaseCard = {
      name: req.body.name,
      set: req.body.set,
      psa10_price_usd: req.body.psa10_price_usd,
      year: req.body.year,
    };
    const response = await mongodb.getDatabase().db(DB_NAME).collection('chase').replaceOne({ _id: cardId }, chaseCard);
    if (response.modifiedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ error: 'Error updating chase card.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete chase card by id
const deleteChase = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db(DB_NAME).collection('chase').deleteOne({ _id: cardId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ error: 'Error deleting chase card.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createChase,
  updateChase,
  deleteChase,
};
