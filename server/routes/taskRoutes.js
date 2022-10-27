const express = require("express")
const router = express.Router()
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController")
const protect = require("../middleware/authMiddleware")

router.get("/", protect, getTasks)

router.post("/", protect, createTask)

router.route("/:id").patch(protect, updateTask).delete(protect, deleteTask)

module.exports = router
