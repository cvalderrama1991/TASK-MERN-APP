const path = require("path")
const express = require("express")
require("dotenv").config()
const port = process.env.PORT
const cors = require("cors")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/errorMiddleware")
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Please set to production"))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port: ${port}`))
