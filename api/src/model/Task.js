const mongoose = require('mongoose');
const db = require('../database');

// maybe this can be expanded to have other statuses?
const STATUS = {
    TODO: 0,
    DONE: 7,
};

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    enum : [STATUS.TODO, STATUS.DONE],
    default: STATUS.TODO,
  },
  created: {
    type: Date,
    default: () => new Date(),
  },
  finished: {
    type: Date,
    default: null,
  },
});

const Task = db.model('Task', TaskSchema);

module.exports = {
  TaskSchema,
  Task,
  STATUS,
};
