const express = require('express')
const search = express.Router()
const fs = require('fs');
const util = require('util');




//Setup API
const { Translate } = require('@google-cloud/translate').v2;
// const TOKEN_ARG = 2;
// const tokenPath = process.argv[TOKEN_ARG];

if (!process.env.HEROKU) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = './google-credentials.json'
}
else {
  // save token
  (async function() {
    const writeFile = util.promisify(fs.writefile);
    await writeFile('./google-credentials.json', process.env.GOOGLE_CREDENTIALS)
    console.log('Saved credentials to file')
  }());
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
