const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { userRules } = require('../validators/userValidator');
const validate = require('../middleware/validate');

const router = express.Router();

// Mounted at /api/users
router.route('/')
  .get(getUsers)
  .post(userRules, validate, createUser);

router.route('/:id')
  .get(getUserById)
  .put(userRules, validate, updateUser)
  .delete(deleteUser);

module.exports = router;
