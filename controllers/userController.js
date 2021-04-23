const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/usersModel.js');


//Post route to sign up
users.post('/signup', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  console.log(req.body)
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (error, createdUser) => {
    if (error) {
        res.status(400).json({ error: error.message })
    }
    else {
        res.status(201).json(createdUser)
    };
  });
});

//User Login Route (Create session route)
users.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            res.send(err)
        }
        else {
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    //login user and create session
                    req.session.currentUser = foundUser
                    res.status(200).json(foundUser)
                }
                else {
                    res.status(404).json({ error: 'User Not Found' })
                }
            }
            else {
                res.status(400).json({ error: err })
            };
        };
    });
});

//user logout
users.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ msg: 'users logged out' })
    });
});


module.exports = users;
