const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name required.'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email is invalid.'],
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be negative.'],
    },
  },
  { timestamps: true }
);

// Collection: "users"
const User = mongoose.model('User', userSchema);

module.exports = User;
