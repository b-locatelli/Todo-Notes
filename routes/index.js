const express = require('express')
 
// routes
const apiRouter = require('./api')

const app = express()

app.use('/', apiRouter)

module.exports = app;