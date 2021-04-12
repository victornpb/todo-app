const express = require('express');
const authMiddleware = require('../middleware/auth');
const newSchemaValidator = require('../middleware/validator');
const { Project } = require('../model/Project');

const namespace = '/projects';

module.exports = (app) => {
  const router = express.Router();
  router.use(authMiddleware);

  // get All
  router.get('/', async (req, res) => {
    const userId = req.userId;

    const projects = await Project.find().where({ userId: userId });
    return res.send({
      data: projects,
    });
  });

  // get
  router.get('/:projectId', async (req, res) => {
    const userId = req.userId;
    const { projectId } = req.params;

    const project = await Project.findOne({
      userId: userId,
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Project does not exist',
      });
    }

    return res.send({
      ...project.toObject(),
    });
  });

  // create
  router.post('/', newSchemaValidator({ name: { type: String, required: false } }), async (req, res) => {
    const userId = req.userId;
    const { name } = req.body;

    try {
      const project = await Project.create({
        name: name || 'Untitled Project',
        userId: userId,
      });

      res.status(201).send({
        project: project.toJSON(),
      });
    } catch (error) {
      return res.status(500);
    }
  });

  // delete
  router.delete('/:projectId', async (req, res) => {
    const userId = req.userId;
    const { projectId } = req.params;

    const result = await Project.deleteOne({
      userId: userId,
      _id: projectId,
    });

    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Project does not exist',
      });
    }
  });

  // update
  router.put('/:projectId', newSchemaValidator({ name: { type: String, required: true } }), async (req, res) => {
    const userId = req.userId;
    const { projectId } = req.params;
    const { name } = req.body;

    const patch = {
      name: name,
    };

    const result = await Project.updateOne(
      {
        userId: userId,
        _id: projectId,
      },
      patch,
    );

    if (result.n === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Project does not exist',
      });
    }
  });

  // register controller routes to app
  app.use(namespace, router);
};
