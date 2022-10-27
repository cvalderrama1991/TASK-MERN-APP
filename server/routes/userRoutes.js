const express = require("express")
const router = express()
const { loginUser, registerUser } = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router
