const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/usersModel.js')

sessions.get('/new', (req, res) => {
  // res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
  res.send('session get is working')
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {

  // Look for the username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      // user is found
      // check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.redirect('/sessions/new')
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.send('session delete is working')
    res.redirect('/')
  })
})

module.exports = sessions
