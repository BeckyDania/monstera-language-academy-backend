const mongoose = require('mongoose');
const {Schema, model} =  mongoose;
//test
const languageSchema = new Schema({
	detectedSourceLanguage: {type: String },
	target: {type: String, required: true},
	q : {type: String, required: true},
	translations: {type: Objectcheck}
})

module.exports = model('Language', languageSchema)