const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const { exclude } = require('./utils/middleware')

app.use(express.json())
app.use(exclude)
app.use('/api/users', userRouter)

module.exports = app
