const express = require('express');
const router = express.Router();
const attacksController = require('../controllers/attacks');
const validateAttack = require('../middleware/validateAttack');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', attacksController.getAll);
router.get('/:id', attacksController.getSingle);

router.post('/', isAuthenticated, validateAttack, attacksController.createAttack);
router.put('/:id', isAuthenticated,  validateAttack, attacksController.updateAttack);
router.delete('/:id', isAuthenticated, attacksController.deleteAttack);

module.exports = router;
