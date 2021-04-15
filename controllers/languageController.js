const express = require('express')
const languages = express.Router()

languages.get('/', (req, res) => {
  res.send('Get route is working')
})

module.exports = languages