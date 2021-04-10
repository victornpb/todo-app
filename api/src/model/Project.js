const mongoose = require('mongoose');
const db = require('../database');

const { TaskSchema } = require('./Task');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    require: true,
  },
  tasks: [
    TaskSchema
  ],
  created: {
    type: Date,
    default: () => new Date(),
  },
});

const Project = db.model('Project', ProjectSchema);

module.exports = {
    ProjectSchema,
    Project,
};
