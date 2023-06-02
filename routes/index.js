const express = require('express')

const apiRouter = require('./api')

const app = express()

app.use('/', apiRouter)

module.exports = app;