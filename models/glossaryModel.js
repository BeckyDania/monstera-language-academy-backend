const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const glossarySchema = Schema ({
  word: { type: String, required: true },
  translateFromLang: { type: String, required: true },
  translateToLang: { type: String, required: true },
  favorite: { type: Boolean, default: false }
}, { timestamps: true });

//creating collection/model
const Glossary = mongoose.model('Glossary', glossarySchema);

module.exports = Glossary;
