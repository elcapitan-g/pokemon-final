const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DB_NAME = 'pokemon'; // Your database name

// Get all cards
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection('pokemon')
      .find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single card
const getSingle = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection('pokemon')
      .find({ _id: cardId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new card
const createCard = async (req, res) => {
  try {
    const card = {
      name: req.body.name,
      setName: req.body.setName,
      rarity: req.body.rarity,
      price: req.body.price,
      release_year: req.body.release_year,
    };
    const response = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection('pokemon')
      .insertOne(card);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the card.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update card
const updateCard = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const card = {
      name: req.body.name,
      setName: req.body.setName,
      rarity: req.body.rarity,
      price: req.body.price,
      release_year: req.body.release_year,
    };
    const response = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection('pokemon')
      .replaceOne({ _id: cardId }, card);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Some error occurred while updating the card.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete card
const deleteCard = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection('pokemon')
      .deleteOne({ _id: cardId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Some error occurred while deleting the card.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCard,
  updateCard,
  deleteCard
};
