const express = require('express');
const router = express.Router();

const cardsController = require('../controllers/cards');
const validation = require('../middleware/validate');

// GET all cards
router.get('/', cardsController.getAll);

// GET single card by ID
router.get('/:id', cardsController.getSingle);

// POST create new card
router.post('/', validation.saveCard, cardsController.createCard);

// PUT update card by ID
router.put('/:id', validation.saveCard, cardsController.updateCard);

// DELETE card by ID
router.delete('/:id', cardsController.deleteCard);

module.exports = router;
