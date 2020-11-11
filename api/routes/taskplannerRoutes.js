module.exports = function(app) {
    var taskplanner = require('../controllers/taskplannerController');
  
    // todoList Routes
    app.route('/tasks')
      .get(taskplanner.list_all_tasks)
      .post(taskplanner.create_a_task);
  
  
    app.route('/tasks/:taskId')
      .get(taskplanner.read_a_task)
      .put(taskplanner.update_a_task)
      .delete(taskplanner.delete_a_task);
  };