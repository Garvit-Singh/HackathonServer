const express = require('express')
const router = express.Router()

// GET REQUEST
router.get('/' , (req,res,next) => {
  res.status(201).send('This is get request to /')
})
// ID here
router.get('/:ID' , (req,res,next) => {
  const id = req.params.ID
  res.status(201).send('This is get request to /ID')
})

// POST REQUEST
router.post('/' , (req,res,next) => {
  res.status(201).send('This is post request to /')
})
// ID here
router.post('/:ID' , (req,res,next) => {
  const id = req.params.ID
  res.status(201).send('This is post request to /ID')
})

// DELETE REQUEST
router.delete('/' , (req,res,next) => {
  res.status(201).send('This is delete request to /')
})
// ID here
router.delete('/:ID' , (req,res,next) => {
  const id = req.params.ID
  res.status(201).send('This is delete request to /ID')
})

// PATCH REQUEST
router.patch('/' , (req,res,next) => {
  res.status(201).send('This is patch request to /')
})
// ID here
router.patch('/:ID' , (req,res,next) => {
  const id = req.params.ID
  res.status(201).send('This is patch request to /ID')
})

module.exports = router