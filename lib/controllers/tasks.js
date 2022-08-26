const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Task = require('../models/Task');

module.exports = Router()
  //get
  .get('/', authenticate, async (req, res, next) => {
    try {
      const tasks = await Task.getAll(req.user.id);
      res.json(tasks);
    } catch (e) {
      next(e);
    }
  })
  //post
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newTask = await Task.insert({ ...req.body, user_id: req.user.id });
      res.json(newTask);
    } catch (e) {
      next(e);
    }
  })

  //put
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const updatedTask = await Task.updateById(req.params.id, req.body);
      res.json(updatedTask);
    } catch (e) {
      next(e);
    }
  })

  //delete
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const deletedTask = await Task.delete(req.params.id);
      res.json(deletedTask);
    } catch (e) {
      next(e);
    }
  });
