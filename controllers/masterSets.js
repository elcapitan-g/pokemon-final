const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all master sets
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('mastersets')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single master set
const getSingle = async (req, res) => {
  try {
    const setId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('mastersets')
      .find({ _id: setId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new master set
const createMasterSet = async (req, res) => {
  try {
    const masterSet = {
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      totalCards: req.body.totalCards,
      price: req.body.price
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('mastersets')
      .insertOne(masterSet);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the master set.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update master set
const updateMasterSet = async (req, res) => {
  try {
    const setId = new ObjectId(req.params.id);
    const masterSet = {
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      totalCards: req.body.totalCards,
      price: req.body.price
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('mastersets')
      .replaceOne({ _id: setId }, masterSet);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Some error occurred while updating the master set.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete master set
const deleteMasterSet = async (req, res) => {
  try {
    const setId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('mastersets')
      .deleteOne({ _id: setId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Some error occurred while deleting the master set.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMasterSet,
  updateMasterSet,
  deleteMasterSet
};
