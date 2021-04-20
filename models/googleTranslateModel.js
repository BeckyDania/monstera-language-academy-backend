const mongoose = require('mongoose');
const {Schema, model} =  mongoose;
//test
const translateSchema = new Schema({
	detectedSourceLanguage: {type: String },
	target: {type: String, required: true},
	query : {type: String, required: true},
	translations: {type: Object}
})

module.exports = model('Translate', translateSchema)