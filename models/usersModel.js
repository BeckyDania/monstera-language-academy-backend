const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema ({
  username: { type: String, unique: true, required: true },
  password: { type:String, required: true },
  glossaryItems: [{ type: Schema.Types.ObjectId, ref: 'Glossary'}]
}, { timestamps: true });

//creating collection/model
const User = mongoose.model('User', userSchema);

module.exports = User;
