// routes/project.routes.js

const router = require('express').Router();
const mongoose = require('mongoose');

// const mongoose = require('mongoose');

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

//  POST /api/projects  -  Creates a new project
router.post('/projects', async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const project = await Project.create({ title, description, tasks: [] });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find().populate('tasks');
    res.json(projects);
  } catch (error) {
    res.json(error);
  }
});

// routes/project.routes.js
// ...

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/projects/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const project = await Project.findById(projectId).populate('tasks');
    res.json(project);
  } catch (error) {
    res.json(error);
  }
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/projects/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.json(error);
  }
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete('/projects/:projectId', async (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    await Project.findByIdAndRemove(projectId);
    res.json({ message: `Project with ${projectId} is removed successfully.` });
  } catch (error) {
    res.json(error);
  }
});

// ...

module.exports = router;
