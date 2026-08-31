const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

const v1Router = require('express').Router()

v1Router.use("/auth", authRouter)
v1Router.use("/users", userRouter)

module.exports = v1Router