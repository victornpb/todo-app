const express = require('express');
const { Project } = require('../model/Project');

const namespace = '/projects';

module.exports = (app) => {

  const router = express.Router();

  router.get('/', async (req, res) => {
    const projects = await Project.find();
    return res.send({
      data: projects
    });
  });

  // register controller routes to app
  app.use(namespace, router);
};
