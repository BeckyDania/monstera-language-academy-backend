const express = require('express')
const languages = express.Router()
const LanguagesModel = require('../models/languagesModel')
//const googleTranslateController = require('./googleTranslate')
const { Translate } = require('@google-cloud/translate').v2;
const TOKEN_ARG = 2;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = './token.json'

const translate = new Translate()

async function detectLanguage() {
  let [detections] = await translate.detect(q);
  detections = Array.isArray(detections) ? detections : [detections];
  console.log("Detections:");
  detections.forEach((detection) => {
      console.log(detection);
  });
  app.locals.detectLanguage = detectLanguage()
  }

async function translateText() {
  let [translations] = await translate.translate(q, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation, i) => {
      console.log('Working')
   //   console.log(`${q[i]} => (${target}) ${translation}`);
  });
}





languages.get('/', (req, res) => {
  //res.send('Get route is working')
  LanguagesModel.find({}, (error, foundLanguages) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(foundLanguages) //  .json() will send proper headers in response so client knows it's json coming back
	})
})

//CREATE Route

languages.post('/', (req, res) => {
  
  detectLanguage()
  translateText()


  /* req.app.locals.detectLanguage
  console.log(req.app.locals.detectLanguage)
  req.app.locals.translateText
  console.log(req.app.locals.translateText) */

  LanguagesModel.create(req.body, (error, createdLanguage) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(createdLanguage) //  .json() will send proper headers in response so client knows it's json coming back
  })
})

//DELETE ROUTE - Not deleting anything
/* languages.delete('/:id', (req, res) => {
  LanguagesModel.findByIdAndDelete(req.params.id, (error, deletedLanguage) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    else if (deletedLanguage === null){
    	res.status(404).json({message: 'Translation Not Found'})
    }
    res.status(200).json({message: 'Translation of ' + deletedLanguage.content + ' deleted successfully'}) 
  })
}) */


//Update Route - soon to update with pronunciation
languages.put('/:id', (req, res) => {
	LanguagesModel.findByIdAndUpdate(req.params.id, req.body, {new: true},  (error, updatedLanguage) => {
	  if (error) {
		res.status(400).json({ error: error.message })
	  }
	  else if (updatedLanguage === null){
		  res.status(404).json({message: 'Holiday Not Found'})
	  }
	  else{
		  res.status(200).json({
			  message: 'Translation for ' + updatedLanguage.content + ' updated successfully',
			  data: updatedLanguage
		  }) 
	  }
	})
  })


module.exports = languages