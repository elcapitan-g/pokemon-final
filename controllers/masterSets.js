const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all attacks
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('attacks').find();
  const attacks = await result.toArray();
  res.status(200).json(attacks);
};

// Get attack by ID
const getSingle = async (req, res) => {
  const attackId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('attacks').findOne({ _id: attackId });
  if (!result) {
    return res.status(404).json({ message: 'Attack record not found' });
  }
  res.status(200).json(result);
};

// Create a new attack record
const createAttack = async (req, res) => {
  const attack = {
    ocean: req.body.ocean,
    num_attacks: req.body.num_attacks
  };

  const response = await mongodb.getDatabase().db().collection('attacks').insertOne(attack);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ error: 'Failed to create attack record' });
  }
};

// Update an attack record
const updateAttack = async (req, res) => {
  const attackId = new ObjectId(req.params.id);
  const attack = {
    ocean: req.body.ocean,
    num_attacks: req.body.num_attacks
  };

  const response = await mongodb.getDatabase().db().collection('attacks').replaceOne({ _id: attackId }, attack);
  if (response.modifiedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json({ error: 'Failed to update attack record' });
  }
};

// Delete an attack record
const deleteAttack = async (req, res) => {
  const attackId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('attacks').deleteOne({ _id: attackId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json({ error: 'Failed to delete attack record' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAttack,
  updateAttack,
  deleteAttack
};
