const express = require('express');
const router = express.Router();
const etbController = require('../controllers/etbController');
const { validateETB } = require('../middleware/etbMiddleware');
const { isAuthenticated } = require('../middleware/authenticate'); 

// GET all ETBs
router.get('/', etbController.getAllETBs);

// GET ETB by ID
router.get('/:id', etbController.getETBById);

// POST create ETB 
router.post('/', isAuthenticated, validateETB, etbController.createETB);

// PUT update ETB 
router.put('/:id', isAuthenticated, validateETB, etbController.updateETB);

// DELETE ETB 
router.delete('/:id', isAuthenticated, etbController.deleteETB);

module.exports = router;
