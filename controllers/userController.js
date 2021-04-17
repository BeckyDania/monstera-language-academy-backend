const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/usersModel.js')

users.get('/new', (req, res) => {
  res.send('create user page')
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  console.log(req.body)
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    // res.redirect('/')
  })
  res.send('user successfully created')
})

module.exports = users
