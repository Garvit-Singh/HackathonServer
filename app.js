const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
// github

const defaultRoutes = require('./API/Routes/DefaultRouteCode')
const userRoutes = require('./API/Routes/UserRoute')
const productRoutes = require('./API/Routes/Product')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb+srv://garvit_singh:'+
        process.env.MONGO_ATLAS_PW+
        '@cluster0-tpxdq.mongodb.net/hackathon?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
}).catch( err => console.log(`Error from mongoose connection ${err}`));

// ROUTES TO BE APPENDED HERE
app.use('/',defaultRoutes)
app.use('/user',userRoutes)
app.use('/products',productRoutes)

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