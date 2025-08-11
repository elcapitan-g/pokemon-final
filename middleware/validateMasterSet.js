const { body, validationResult } = require('express-validator');

const validateAttack = [
  body('ocean')
    .notEmpty()
    .withMessage('Ocean is required')
    .isIn(['Pacific', 'Atlantic', 'Indian', 'Arctic', 'Southern'])
    .withMessage('Ocean must be one of Pacific, Atlantic, Indian, Arctic, Southern'),
  body('num_attacks')
    .isInt({ min: 0 })
    .withMessage('Number of attacks must be an integer greater or equal to 0'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateAttack;
