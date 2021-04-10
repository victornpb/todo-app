const mongoose = require('mongoose');
const db = require('../database');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const User = db.model('User', UserSchema);

module.exports = {
  UserSchema,
  User,
};
