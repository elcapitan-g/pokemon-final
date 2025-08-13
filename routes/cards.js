const express = require('express');
const router = express.Router();

const cardsController = require('../controllers/cards');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate'); 

// GET all cards
router.get('/', cardsController.getAll);

// GET single card by ID
router.get('/:id', cardsController.getSingle);

// POST create new card (requires login)
router.post('/', isAuthenticated, validation.saveCard, cardsController.createCard);

// PUT update card by ID (requires login)
router.put('/:id', isAuthenticated, validation.saveCard, cardsController.updateCard);

// DELETE card by ID (requires login)
router.delete('/:id', isAuthenticated, cardsController.deleteCard);

module.exports = router;
