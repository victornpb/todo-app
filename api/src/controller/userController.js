const express = require('express');
const Validator = require('schema-validator');
const { User } = require('../model/User');
const { createToken, testToken } = require('../auth');

const namespace = '/user';

module.exports = (app) => {

  const router = express.Router();
  
  router.post('/register', [new Validator({
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      test: /.+@.+/,
    },
    password: {
      required: true,
      type: String,
    },
  }, true) ], async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    if (await User.findOne({
      email,
    })) {
      return res
        .status(409)
        .json({
          error: 'USER_EXISTS',
          message: 'A User with the provided email already exists'
        });
    }

    const user = {
      name,
      email,
      password, // TODO: hash it
    };

    try {
      const result = await User.create(user);

      return res.json({
        ...result.toJSON(),
        password: undefined,
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).send({ err });
    }

  });

  // login
  router.post('/login', [new Validator({
    email: {
      type: String,
      required: true,
      test: /.+@.+/,
    },
    password: {
      type: String,
      required: true,
    },
  }, true)], async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('password');
    if (!user) {
      return res.status(404).send({
        error: 'USER_NOT_FOUND',
        message: 'User does not exist'
      });
    }

    const isPwCorrect = await user.testPassword(password);
    if (isPwCorrect) {
      try {
        const token = await createToken(user.id);
        res.status(200).json({
          token: token,
        });
      }
      catch (err) {
        console.error('Error creating token', err);
        res.status(500);
      }

    }
    else {
      res.status(401).json({
        code: 'INVALID_PW',
        message: 'Invalid password',
      });
    }
  });

  // register controller routes to app
  app.use(namespace, router);
};
