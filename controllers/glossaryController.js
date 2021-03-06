const express = require('express')
const glossary = express.Router()
const Glossary = require('../models/glossaryModel.js')
const User = require('../models/usersModel.js');

// get list of all words
glossary.get('/', (req, res) => {
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    else {
      Glossary.find({_id: foundUser.glossaryItems}, (error, foundWords) => {
        if (error) {
          res.status(400).json(error)
        }
        else {
          res.status(200).json(foundWords)
        };
      });
    }
  })
});

// add word to the glossary
glossary.post('/', (req, res) => {
  Glossary.create(req.body, (error, createdWord) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    else {
      User.findById(req.session.currentUser._id, (error, foundUser) => {
        if (error) {
          res.status(400).json({error: error.message})
        }
        else {
          foundUser.glossaryItems.push(createdWord)
          foundUser.save()
          res.status(201).json(createdWord)
        }
      })
    };
  });
});

// delete word from the glossary
glossary.delete('/:id', (req, res) => {
  Glossary.findByIdAndDelete(req.params.id, (error, deletedWord) => {
    if(error) {
      res.status(400).json({error: error.message})
    }
    else if (deletedWord === null) {
      res.status(404).json({message: 'Word is not found'})
    }
    else {
      res.status(200).json({message: `Word ${deletedWord.text} deleted successfully`})
    };
  });
});

// update word in the glossary
glossary.put('/:id', (req, res) => {
  Glossary.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedWord) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    else {
      res.status(200).json({ message: `Word ${updatedWord.text} updated successfully`, data: updatedWord })
    };
  });
});

// add/remove word in favorites that will be used in practice game
glossary.patch('/:id/addToFavorites', (req, res) => {
  Glossary.findById(req.params.id, (error, word) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    else {
      // toggle flag true/false
      word.favorite = !word.favorite
      word.save()

      res.status(200).json({
        message: `Favorite flag for ${word.text} was set to ${word.favorite}`,
        data: word
      })
    };
  });
});

module.exports = glossary
