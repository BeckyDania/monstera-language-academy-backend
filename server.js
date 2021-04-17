require('dotenv').config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODBURI
const express = require('express')
const app = express()

//Setup Mongoose
const mongoose = require('mongoose');

// set up connection with the DB
mongoose.connect('mongodb://localhost:27017/languagesDB',{
	useNewUrlParser:true,
	useUnifiedTopology: true
});

// set up listeners to monitor your database connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));

// MIDDLEWARES
//interpreting incoming request as JSON
app.use(express.json());

//controllers
app.use('/languages', require('./controllers/languageController'))
app.use('/users', require('./controllers/userController.js'))

app.listen(PORT, () => {
	console.log('Server is listening on port', PORT)
  })

  //localhost:3060/languages
