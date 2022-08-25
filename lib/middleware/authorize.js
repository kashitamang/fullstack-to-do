const Task = require('../models/Task');

module.exports = async (req, res, next) => {
  try {
    if (req.method === 'PUT') {
      const task = await Task.getById(req.params.id);
      if (req.user.id !== task.user_id) {
        throw new Error('You do not have access to update this task');
      }
    }
    if (req.method === 'DELETE') {
      const task = await Task.getById(req.params.id);
      if (req.user.id !== task.user_id) {
        throw new Error('You do not have access to delete this task');
      }
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
