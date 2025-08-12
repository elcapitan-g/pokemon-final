const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all cards
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('cards')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single card
const getSingle = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('cards')
      .find({ _id: cardId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new card
const createCard = async (req, res) => {
  try {
    const card = {
      name: req.body.name,
      type: req.body.type,
      rarity: req.body.rarity,
      set: req.body.set,
      condition: req.body.condition
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('cards')
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
      type: req.body.type,
      rarity: req.body.rarity,
      set: req.body.set,
      condition: req.body.condition
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('cards')
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
      .getDb()
      .db()
      .collection('cards')
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
