const { body } = require('express-validator');

const userRules = [
  body('firstName').trim().notEmpty().withMessage('First name is required.'),
  body('lastName').trim().notEmpty().withMessage('Last name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a whole number of 0 or more.'),
];

module.exports = { userRules };
