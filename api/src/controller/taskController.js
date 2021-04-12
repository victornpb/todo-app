const express = require('express');
const authMiddleware = require('../middleware/auth');
const newSchemaValidator = require('../middleware/validator');
const { Project } = require('../model/Project');
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
    '/:projectId',
    newSchemaValidator({
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: [STATUS.TODO, STATUS.DONE],
        required: false,
      },
    }),
    async (req, res) => {
      const userId = req.userId;
      const projectId = req.params.projectId;
      const { description, status } = req.body;

      const project = await Project.findOne({
        _id: projectId,
        userId,
      });

      if (!project) {
        return res.status(404).json({
          code: 'PROJECT_NOT_FOUND',
          message: 'You do not own a project with this ID',
        });
      }

      try {
        const task = new Task({
          description: description,
          userId: userId,
          projectId: projectId,
        });

        project.tasks.push(task);
        await project.save();

        res.status(201).send({
          ...task.toJSON(),
        });
      } catch (error) {
        return res.status(500).send(error);
      }
    },
  );

  // update
  router.put(
    '/:projectId/:taskId',
    newSchemaValidator({
      status: {
        required: false,
        enum: [STATUS.TODO, STATUS.DONE],
      },
      description: {
        type: String,
        required: true,
      },
    }),
    async (req, res) => {
      const userId = req.userId;
      const { projectId, taskId } = req.params;
      const { status, description } = req.body;

      const project = await Project.findOne({
        _id: projectId,
        userId,
      });

      if (!project) {
        return res.status(404).json({
          code: 'PROJECT_NOT_FOUND',
          message: 'You do not own a project with this id',
        });
      }

      const task = project.tasks.find((task) => task.id === taskId);
      if (!task) {
        return res.status(404).json({
          code: 'TASK_NOT_FOUND',
          message: 'This project does not contain a task with this id',
        });
      }

      if (task.status === STATUS.DONE) {
        return res.status(403).json({
          code: 'UPDATE_NOT_ALLOWED',
          message: 'Updating a completed task is not allowed',
        });
      }

      if (status === STATUS.DONE) {
        task.finished = new Date();
        task.status = status;
      }
      
      task.description = description || task.description;

      await project.save();

      res.status(200).json({
        ...task.toObject(),
      });
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
  router.put(
    '/:taskId',
    newSchemaValidator({
      description: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        enum: [STATUS.TODO, STATUS.DONE],
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
    },
  );

  // register controller routes to app
  app.use(namespace, router);
};
