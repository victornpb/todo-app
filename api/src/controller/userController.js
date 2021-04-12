const express = require('express');
const newSchemaValidator = require('../middleware/validator');
const { User } = require('../model/User');
const { createToken, testToken } = require('../auth');

const namespace = '/user';

module.exports = (app) => {
  const router = express.Router();

  router.post(
    '/register',
    newSchemaValidator({
      name: {
        required: true,
        type: 'string',
      },
      email: {
        required: true,
        type: 'string',
      },
      password: {
        required: true,
        type: 'string',
      },
    }),
    async (req, res) => {
      const { name, email, password } = req.body;

      // Check if email already exists
      if (await User.findOne({ email })) {
        return res.status(409).json({
          error: 'USER_EXISTS',
          message: 'A User with the provided email already exists',
        });
      }

      const user = {
        name,
        email,
        password, // hashed by the model
      };

      try {
        const result = await User.create(user);

        return res.json({
          ...result.toJSON(),
          password: undefined, // redact hash from response
        });
      } catch (err) {
        console.error({ err });
        res.status(500).send();
      }
    },
  );

  // login
  router.post(
    '/login',
    newSchemaValidator({
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    }),
    async (req, res) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({
          error: 'USER_NOT_FOUND',
          message: 'User does not exist',
        });
      }

      const isPwCorrect = await user.testPassword(password);
      if (isPwCorrect) {
        try {
          const token = await createToken(user.id);
          res.status(200).json({
            user: {
              ...user.toObject(),
              password: undefined, // redact hash from response
            },
            token: token,
          });
        } catch (err) {
          console.error('Error creating token', { err });
          res.status(500).send();
        }
      } else {
        res.status(401).json({
          code: 'INVALID_PW',
          message: 'Invalid password',
        });
      }
    },
  );

  // register controller routes to app
  app.use(namespace, router);
};
