
const express = require('express')
const languages = express.Router()
const LanguagesModel = require('../models/languagesModel')



  // GET List of languages

//Set up Index

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

// DETECT Language


// Translation 


languages.post('/', (req, res) =>{


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