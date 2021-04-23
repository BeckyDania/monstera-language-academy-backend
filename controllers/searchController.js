const express = require('express')
const search = express.Router()

//Setup API
const { Translate } = require('@google-cloud/translate').v2;
const GoogleTextToSpeech = require('@google-cloud/text-to-speech');

process.env.GOOGLE_APPLICATION_CREDENTIALS = './token.json'

// Import other required libraries
const fs = require('fs');
const util = require('util');

// Creates a client
const translate = new Translate();
const client = new GoogleTextToSpeech.TextToSpeechClient();

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



const pronunciation = async function(targetLanguage, translations) {
  // Construct the request
  const request = {
    input: {text: translations[0]},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: detections[0].language, ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  
}


// POST route to return translated text
search.post('/', async (req, res) => {
  const detectedLanguage = await detectLanguage(req.body.text);
  const translation = await translateText(req.body.text, req.body.translateTo)
  const pronouncedWord = await pronunciation(req.body.audioContent)
  ;

  const returnObject = {
    text: req.body.text,
    translatedText: translation,
    translateFromLang: detectedLanguage,
    translateToLang: req.body.translateTo,
    pronouncedTranslation: pronouncedWord
  }

  res.status(200).json(returnObject)
})

module.exports = search
