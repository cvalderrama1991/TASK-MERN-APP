const errorHandler = (error, _, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode
  console.log("error middleware")

  res.status(statusCode)
  res.json({ message: error.message })
}

module.exports = errorHandler
