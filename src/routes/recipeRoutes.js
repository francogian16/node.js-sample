const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { recipeRules } = require('../validators/recipeValidator');
const validate = require('../middleware/validate');

const router = express.Router();

// Mounted at /api/recipes
router.route('/')
  .get(getRecipes)
  .post(recipeRules, validate, createRecipe);

router.route('/:id')
  .get(getRecipeById)
  .put(recipeRules, validate, updateRecipe)
  .delete(deleteRecipe);

module.exports = router;
