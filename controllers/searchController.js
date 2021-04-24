const express = require('express')
const search = express.Router()
const fs = require('fs');
const util = require('util');


//Setup API
const { Translate } = require('@google-cloud/translate').v2;

if (!process.env.HEROKU) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = './google-credentials.json'
}

// Creates a client
const translate = new Translate();

const detectLanguage = async function(text){
  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];

  return detections[0].language
}

const translateText = async function(text, targetLanguage){
  let [translations] = await translate.translate(text, targetLanguage);
  translations = Array.isArray(translations) ? translations : [translations];

  return translations[0]
}




// POST route to return translated text
search.post('/', async (req, res) => {
  const detectedLanguage = await detectLanguage(req.body.text);
  const translation = await translateText(req.body.text, req.body.translateTo);

  const returnObject = {
    text: req.body.text,
    translatedText: translation,
    translateFromLang: detectedLanguage,
    translateToLang: req.body.translateTo
  }

  res.status(200).json(returnObject)
})

module.exports = search
