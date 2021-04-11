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

    }

  });

  // register controller routes to app
  app.use(namespace, router);
};
