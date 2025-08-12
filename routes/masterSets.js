const express = require('express');
const router = express.Router();

const masterSetsController = require('../controllers/masterSets');
const validation = require('../middleware/validateMasterSet');

// GET all master sets
router.get('/', masterSetsController.getAll);

// GET single master set by ID
router.get('/:id', masterSetsController.getSingle);

// POST create new master set
router.post('/', validation.saveMasterSet, masterSetsController.createMasterSet);

// PUT update master set by ID
router.put('/:id', validation.saveMasterSet, masterSetsController.updateMasterSet);

// DELETE master set by ID
router.delete('/:id', masterSetsController.deleteMasterSet);

module.exports = router;
