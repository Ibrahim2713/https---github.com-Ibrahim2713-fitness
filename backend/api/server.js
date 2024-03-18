const express = require('express')
const cors = require('cors')
const AuthRouter = require('./auth/auth-router')
const nutritionRouter = require('./nutrition-data/nutritionRouter')
const userRouter = require('./users/user-router')


const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())
server.use('/api/auth', AuthRouter)
server.use('/api/nutrition', nutritionRouter)
server.use('/api/users', userRouter )






module.exports = server
