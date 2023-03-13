// routes/task.routes.js

const router = require('express').Router();
// const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

//  POST /api/tasks  -  Creates a new task
router.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, projectId } = req.body;
    const task = await Task.create({ title, description, project: projectId });
    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
