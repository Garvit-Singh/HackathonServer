const express = require('express')
const { route } = require('../../app')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../Models/User')

router.post('/signup',(req,res,next)=> { 
  User.find({bitsID: req.body.bitsID}).exec()
      .then( user => {
          if( user.length >=1 ) {
              return res.status(422).json({message: 'User exist account is already created'})
          } else {
              bcrypt.hash(req.body.password,10,(err,hash) => {
                      if( err ) {
                          return res.status(500).json({ error: err})
                      } else {
                          const user = new User({
                              _id: new mongoose.Types.ObjectId(),
                              username: req.body.username ,
                              bitsID: req.body.bitsID,
                              password: hash,
                              Hostel: req.body.hostel,
                              room_no: req.body.room_no
                          });
                          user.save()
                              .then( response => {
                                  console.log(response)
                                  res.status(201).json({result: response})
                              })
                              .catch( err => {
                                  res.status(500).json({ error : err })
                              })
                      }
              })
          }
      })
})

module.exports = router