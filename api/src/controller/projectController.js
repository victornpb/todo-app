const express = require('express');
const { Project } = require('../model/Project');

const namespace = '/projects';

module.exports = (app) => {

  const router = express.Router();
  
  // get
  router.get('/', async (req, res) => {
    const projects = await Project.find();
    return res.send({
      data: projects
    });
  });

  // create
  router.post("/", async (req, res) => {
    try {
      const project = await Project.create({
        name: 'Untitled',
        userId: '1',
      });
  
      res.send({ project });
    } catch (error) {
      return res.status(500);
    }
  });

  // register controller routes to app
  app.use(namespace, router);
};
