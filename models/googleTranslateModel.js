
const mongoose = require('mongoose');
const {Schema, model} =  mongoose;
//test
const translateSchema = new Schema({
	text : {type: String, required: true},
	target: {type: String, required: true},
	detectedSourceLanguage: {type: String },
	translation: {type: Object}
})
  
module.exports = model('Translate', translateSchema)