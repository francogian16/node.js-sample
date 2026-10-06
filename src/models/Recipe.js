const mongoose = require('mongoose');

// Schema = fields, types and validation rules for a recipe document.
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required.'],
      trim: true,
    },
    servings: {
      type: Number,
      min: [1, 'Servings must be at least 1.'],
      default: 1,
    },
    ingredients: {
      type: [
        {
          _id: false,
          name: { type: String, required: [true, 'Ingredient name required.'], trim: true },
          qty: { type: String, trim: true },
        },
      ],
      validate: {
        validator: (list) => Array.isArray(list) && list.length > 0,
        message: 'At least one ingredient is required.',
      },
    },
    instructions: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Compile the schema into a Model (collection: "recipes").
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
