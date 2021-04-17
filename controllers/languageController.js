const express = require('express')
const languages = express.Router()
const LanguagesModel = require('../models/languagesModel')


languages.get('/', (req, res) => {
  res.send('Get route is working')
})

module.exports = languages