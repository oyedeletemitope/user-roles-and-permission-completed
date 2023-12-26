const express = require("express");
const router = express.Router();
const { tasks } = require("../data");
const { authUser } = require("../basicAuth");
const {
  canViewTask,
  scopedTasks,
  canDeleteTask,
} = require("../permissions/taskPermission");

router.get("/", authUser, (req, res) => {
  res.json(scopedTasks(req.user, tasks));
});

router.get("/:taskId", setTask, authUser, authGetTask, (req, res) => {
  res.json(req.task);
});

router.delete("/:taskId", setTask, authUser, authDeleteTask, (req, res) => {
  res.send("task deleted succesfully");
});

function setTask(req, res, next) {
  const taskId = parseInt(req.params.taskId);
  req.task = tasks.find((task) => task.id === taskId);

  if (req.task == null) {
    res.status(404);
    return res.send("Task not found");
  }
  next();
}

function authGetTask(req, res, next) {
  if (!canViewTask(req.user, req.task)) {
    res.status(401);

    return res.send("not allowed ");
  }
  next();
}

function authDeleteTask(req, res, next) {
  if (!canDeleteTask(req.user, req.task)) {
    res.status(401);

    return res.send("not allowed ");
  }
  next();
}

module.exports = router;
