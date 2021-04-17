const express = require('express')
const languages = express.Router()
const LanguagesModel = require('../models/languagesModel')


languages.get('/', (req, res) => {
  res.send('Get route is working')
})

languages.post('/', (req, res) => {
  LanguagesModel.create(req.body, (error, createdLanguage) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(createdLanguage) //  .json() will send proper headers in response so client knows it's json coming back
  })
})



module.exports = languages