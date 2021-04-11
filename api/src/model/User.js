const mongoose = require('mongoose');
const db = require('../database');
const { hashPassword, testPassword } = require('../auth');



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

UserSchema.pre('save', async function hashPassword(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (user.isNew || user.isModified('password')) {
    // hash the password
    user.password = await hashPassword(user.password, SALT_WORK_FACTOR);
  }

  next();
});

UserSchema.methods.testPassword = async function testPassword(password) {
  return testPassword(this.password, password);
};

module.exports = {
  UserSchema,
  User,
};
