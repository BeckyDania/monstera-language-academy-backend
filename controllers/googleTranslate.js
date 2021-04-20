
//Setup API

const { Translate } = require('@google-cloud/translate').v2;
const express = require('express')
const translations = express.Router()
const translateTextModel = require('../models/googleTranslateModel');
//const { query, json, response, text } = require('express');
 
const TOKEN_ARG = 2;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = './token.json'

// Creates a client
const translate = new Translate();


translations.post('/', async (req, res) =>{
    const cachedTranslation = await translateTextModel.findOne({
            text: req.body.text,
            target: req.body.target
        }//,
      /*    {
            "_id": 1, text:1, target:1, detectedSourceLanguage: 1, translation: 1
        }   */
   
     )
    if(cachedTranslation){
        console.log("database hit")
        res.send(cachedTranslation)
    } else{
        console.log("Fetching form Google")
   const detection = await translate.detect(req.body.text);
   //search for text - mongodb return immediately - cache the results from Google Translate
    const translation = await translate.translate(req.body.text, req.body.target);
    
  //  res.send(translations)
    const newTranslation = {
        text: req.body.text,
        target: req.body.target,
        detectedSourceLanguage: detection[0].language,
        translation: translation[0]
    }
    //res.send(newTranslation)
    
 
    translateTextModel.create(newTranslation, (error, createdTranslation) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).json(createdTranslation) //  .json() will send proper headers in response so client knows it's json coming back
     
    })
    }
  
  })
  
 
module.exports = translations


/* 
const text = [
    "这是一个非常好的API",
  //  "to jest bardzo dobre API",
   // "это очень хороший API",
];
const target = "en";
 */

/* const detectLanguage = async function(req, res){
//async function detectLanguage() {
let [detections] = await translate.detect(text);
    detections = Array.isArray(detections) ? detections : [detections];
    console.log("Detections:");
    detections.forEach((detection) => {
        console.log(detection);
    });
} 

//detectLanguage();  

const translateText = async function(req, res){
//async function translateText() {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log("Translations:", translations);
//    translations.forEach((translation, i) => {
   //     console.log(`${text[i]} => (${target}) ${translation}`);
 //   });
}
  */

//translateText();
