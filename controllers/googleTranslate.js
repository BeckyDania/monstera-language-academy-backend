
//Setup API
/* const { Translate } = require('@google-cloud/translate').v2;
const express = require('express')
const translations = express.Router()

const TOKEN_ARG = 2;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = './token.json' */

// Creates a client
//const translate = new Translate();

/* 
const text = [
    "这是一个非常好的API",
    "to jest bardzo dobre API",
    "это очень хороший API",
];
const target = "en";
 */

//const detectLanguage = async function(req, res){
//async function detectLanguage() {
  /*   let [detections] = await translate.detect(text);
    detections = Array.isArray(detections) ? detections : [detections];
    console.log("Detections:");
    detections.forEach((detection) => {
        console.log(detection);
    });
} 
 */
//detectLanguage();  
/* 
const translateText = async function(req, res){
//async function translateText() {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log("Translations:");
    translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
    });
}
 */
//translateText();

 /* 
async function listLanguages() {
    const languages = await translate.getLanguages();

    console.log("Languages:");
    languages.forEach((language) => console.log(language));
}

listLanguages();
 */


 
//module.exports = translations
