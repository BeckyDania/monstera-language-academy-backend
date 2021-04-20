const express = require('express')
const glossary = express.Router()
const Glossary = require('../models/glossaryModel.js')

glossary.get('/', (req, res) => {
  res.send('glossary returns something')
})

module.exports = glossary
