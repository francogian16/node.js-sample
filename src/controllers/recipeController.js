const Recipe = require('../models/Recipe');

// Every handler is async and wraps its awaits in try...catch.
// Errors are passed to next() so the central error handler picks the right status code.

// CREATE — POST /api/recipes
const createRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

// READ ALL — GET /api/recipes?search=adobo
const getRecipes = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.search) {
      // Escape regex special characters so user input is matched literally
      const search = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: search, $options: 'i' };
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

// READ ONE — GET /api/recipes/:id
const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

// UPDATE — PUT /api/recipes/:id
const updateRecipe = async (req, res, next) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after', // return the updated document (replaces the older `new: true`)
      runValidators: true, // apply schema rules on update too
    });
    if (!updated) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE — DELETE /api/recipes/:id
const deleteRecipe = async (req, res, next) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
