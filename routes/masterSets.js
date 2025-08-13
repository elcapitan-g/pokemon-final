const express = require('express');
const router = express.Router();

const masterSetsController = require('../controllers/masterSets');
const validation = require('../middleware/validateMasterSet');
const { isAuthenticated } = require('../middleware/authenticate'); 

// GET all master sets
router.get('/', masterSetsController.getAll);

// GET single master set by ID
router.get('/:id', masterSetsController.getSingle);

// POST create new master set 
router.post('/', isAuthenticated, validation.saveMasterSet, masterSetsController.createMasterSet);

// PUT update master set by ID 
router.put('/:id', isAuthenticated, validation.saveMasterSet, masterSetsController.updateMasterSet);

// DELETE master set by ID 
router.delete('/:id', isAuthenticated, masterSetsController.deleteMasterSet);

module.exports = router;
