const expressAsyncHandler = require("express-async-handler")

const Task = require("../models/taskModel")

// @desc Get all task
// @route GET /api/tasks
// @access Private
const getTasks = expressAsyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })

  res.status(200).json(tasks)
})

// @desc Create task
// @route POST /api/tasks
// @access Private
const createTask = expressAsyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please add a text field")
  }

  const task = await Task.create({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user.id,
  })

  res.status(201).json(task)
})

// @desc Update Task
// @route PATCH /api/tasks/:id
// @access Private

const updateTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  // Check for task
  if (!task) {
    res.status(400)
    throw new Error("Task not found")
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

// @desc Delete Task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  // Check for task
  if (!task) {
    res.status(400)
    throw new Error("Task not found")
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await task.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = { getTasks, createTask, updateTask, deleteTask }
