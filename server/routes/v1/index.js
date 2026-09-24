const authRouter = require('./authRouter')
const seedRouter = require('./seedRouter')
const userRouter = require('./userRouter')

const v1Router = require('express').Router()

v1Router.use("/auth", authRouter)
v1Router.use("/users", userRouter)
v1Router.use("/seed", seedRouter)
module.exports = v1Router