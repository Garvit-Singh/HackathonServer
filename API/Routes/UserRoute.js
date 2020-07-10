const express = require('express')
const { route } = require('../../app')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

router.post('/login',(req,res,next) => {
    User.find({bitsID: req.body.bitsID}).exec()
        .then( user => {
            if( user.length < 1 ){
               return res.status(404).json({ message: 'Auth Failed'})
            } 
            bcrypt.compare(req.body.password , user[0].password , ( err , result) => {
                if( err ) {
                    return res.status(401).json({ message: 'Auth Failed'})
                }
                if( result ) {
                    const token = jwt.sign(
                    {
                        bitsID: user[0].bitsID,
                        userId: user[0]._id
                    },process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })
                    return res.status(200).json({ message: 'Auth Success', token: token , user : user[0]})
                }
            })
        })
        .catch( err => {
            res.status(500).json({err})
        })
})

router.delete('/:userId',(req,res,next)=> {
    User.remove({_id: req.params.userId}).exec()
        .then( result => {
            res.status(200).json({message: 'User Deleted', user : result})
        })
        .catch( err => {
            res.status(200).json({message: 'User can not be deleted', err})
        });
})


module.exports = router