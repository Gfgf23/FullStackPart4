const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogsRouter = require('./utils/blogsRouter')
const usersRouter = require('./utils/usersRouter')
const loginRouter = require('./utils/loginRouter')
app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app