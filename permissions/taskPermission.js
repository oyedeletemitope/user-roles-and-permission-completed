const { ROLE } = require("../data");

function canViewTask(user, task) {
  return user.role === ROLE.ADMIN || task.userId == user.id;
}

function scopedTasks(user, tasks) {
  if (user.role === ROLE.ADMIN) return tasks;
  return tasks.filter((task) => task.userId === user.id);
}

function canDeleteTask(user, task) {
  return task.userId == user.id;
}
module.exports = {
  canViewTask,
  scopedTasks,
  canDeleteTask,
};
