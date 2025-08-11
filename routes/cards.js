const express = require('express');
const router = express.Router();
const sharkController = require('../controllers/sharks');
const validateShark = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', sharkController.getAll);
router.get('/:id', sharkController.getSingle);

router.post('/', isAuthenticated, validateShark, sharkController.createShark);
router.put('/:id', isAuthenticated,  validateShark, sharkController.updateShark);
router.delete('/:id', isAuthenticated, sharkController.deleteShark);

module.exports = router;