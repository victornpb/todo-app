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

UserSchema.pre('save', async function hashPasswordHook() {
  const user = this;

  console.log('isNew', user.isNew, user);

  // only hash the password if it has been modified (or is new)
  if (user.isNew || user.isModified('password')) {
    // hash the password
    user.password = await hashPassword(user.password);
    // next();
  }
});

UserSchema.methods.testPassword = async function testPasswordMethod(password) {
  return await testPassword(this.password, password);
};

const User = db.model('User', UserSchema);

module.exports = {
  UserSchema,
  User,
};
