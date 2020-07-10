const express = require('express')
const app = express()

app.use((req,res,next) => {
  res.status(201).send('Welcome to Server')
})

module.exports = app