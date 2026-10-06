const { body } = require('express-validator');

// Never trust the client — check the request body before it reaches the controller.
const recipeRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('servings').optional().isInt({ min: 1 }).withMessage('Servings must be a whole number of at least 1.'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be a non-empty array.'),
  body('ingredients.*.name').trim().notEmpty().withMessage('Each ingredient needs a name.'),
  body('instructions').optional().isString().withMessage('Instructions must be text.'),
];

module.exports = { recipeRules };
