const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const glossarySchema = Schema ({
  text: { type: String, required: true },
  translatedText: { type: String, required: true },
  translateFromLang: { type: String, required: true },
  translateToLang: { type: String, required: true },
  favorite: { type: Boolean, default: false }
}, { timestamps: true });

//creating collection/model
const Glossary = mongoose.model('Glossary', glossarySchema);

module.exports = Glossary;
