const express = require('express');
const authMiddleware = require('../middleware/auth');
const { Task, STATUS } = require('../model/Task');

const namespace = '/tasks';

module.exports = (app) => {
  const router = express.Router();
  router.use(authMiddleware);

  // get All
  router.get('/', async (req, res) => {
    const userId = req.userId;

    const tasks = await Task.find().where({ userId: userId });
    return res.send({
      data: tasks,
    });
  });

  // get All
  router.get('/', async (req, res) => {
    const userId = req.userId;

    const tasks = await Task.find().where({ userId: userId });
    return res.send({
      data: tasks,
    });
  });

  // create
  router.post(
    '/:taskId',
    newSchemaValidator({
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum : [STATUS.TODO, STATUS.DONE],
        required: false,
      },
    }),
    async (req, res) => {
      const userId = req.userId;
      const { description, status } = req.body;

      try {
        const task = await Task.create({
          description: description,
          userId: userId,
        });

        res.status(201).send({
          task: task.toJSON(),
        });
      } catch (error) {
        return res.status(500);
      }
    },
  );

  // delete
  router.delete('/:taskId', async (req, res) => {
    const userId = req.userId;
    const { taskId } = req.params;

    const result = await Task.deleteOne({
      userId: userId,
      _id: taskId,
    });

    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Task does not exist',
      });
    }
  });

  // update
  router.put('/:taskId', newSchemaValidator({
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum : [STATUS.TODO, STATUS.DONE],
      required: false,
    },
  }),
  async (req, res) => {
    const userId = req.userId;
    const { taskId } = req.params;
    const { description, status } = req.body;

    const patch = {
      name: name,
    };

    const result = await Task.updateOne(
      {
        userId: userId,
        _id: taskId,
      },
      patch,
    );

    if (result.n === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Task does not exist',
      });
    }
  });

  // register controller routes to app
  app.use(namespace, router);
};
