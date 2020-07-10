const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// github
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use((req,res,next) => {
  res.status(201).send('Welcome to Server ')
})

app.use((req,res,next) => {
  const error = new Error('NOT FOUND')
  error.status = 404
  next(error)
})

app.use((error,req,res,next) => {
  res.status( error.status || 500) 
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app