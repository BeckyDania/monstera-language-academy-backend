const mongoose = require('mongoose');
const {Schema, model} =  mongoose;
//test
const languageSchema = new Schema({
	sourceLanguageCode: {type: String, required: true},
	targetLanguageCode: {type: String, required: true},
	content: {type: String, required: true},
	translatedText: {type: String}
})

module.exports = model('Language', languageSchema)