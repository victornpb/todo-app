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
  
      res.send({
        project: project.toJSON(),
      });

    } catch (error) {
      return res.status(500);
    }
  });

  // register controller routes to app
  app.use(namespace, router);
};
