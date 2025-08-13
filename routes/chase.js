// src/routes/chase.js
const express = require('express');
const router = express.Router();

const chaseController = require('../controllers/chaseController');
const validation = require('../middleware/validateChase');
const { isAuthenticated } = require('../middleware/authenticate'); 

// GET all chase cards
router.get('/', chaseController.getAll);

// GET chase card by id
router.get('/:id', chaseController.getSingle);

// POST new 
router.post('/', isAuthenticated, validation.saveChase, chaseController.createChase);

// PUT update 
router.put('/:id', isAuthenticated, validation.saveChase, chaseController.updateChase);

// DELETE chase 
router.delete('/:id', isAuthenticated, chaseController.deleteChase);

module.exports = router;
