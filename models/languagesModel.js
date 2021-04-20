const mongoose = require('mongoose');
const {Schema, model} =  mongoose;
//test
const languageSchema = new Schema(
	{
	q : {type: String, required: true},
	target: {type: String, required: true},
	detectedSourceLanguage: {type: String },
	translations: {type: Object}
	}
);



module.exports = model('Language', languageSchema)