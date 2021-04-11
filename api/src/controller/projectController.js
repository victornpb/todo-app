const express = require('express');
const authMiddleware = require('../middleware/auth');
const { Project } = require('../model/Project');

const namespace = '/projects';

module.exports = (app) => {

  const router = express.Router();
  router.use(authMiddleware);
  
  // get
  router.get('/', async (req, res) => {
    const userId = req.userId;

    const projects = await Project.find().where({userId: userId});
    return res.send({
      data: projects
    });
  });

  // create
  router.post('/', async (req, res) => {
    const userId = req.userId;
    const { name } = req.body;

    try {
      const project = await Project.create({
        name: name || 'Untitled',
        userId: userId,
      });
  
      res.status(201).send({
        project: project.toJSON(),
      });

    } catch (error) {
      return res.status(500);
    }
  });

  // get
  router.delete('/:projectId', async (req, res) => {
    const userId = req.userId;
    const { projectId } = req.params;

    const result = await Project.deleteOne({
      userId: userId,
      _id: projectId,
    });

    if (result.deletedCount === 1) {
      res.status(204).end();
    }
    else {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Project does not exist',
      });
    }
  });

  // register controller routes to app
  app.use(namespace, router);
};
