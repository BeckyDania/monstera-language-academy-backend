const express = require('express')
const languages = express.Router()
const languagesModel = require('../models/languagesModel')


languages.get('/', (req, res) => {
  res.send('Get route is working')
})

module.exports = languages