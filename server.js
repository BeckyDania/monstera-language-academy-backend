const express = require('express')
const app = express()
const PORT = 3060

//Setup Mongoose
const mongoose = require('mongoose');

//middleware
app.use(express.json()); //use .json(), not .urlencoded()


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

//controllers
app.use('/languages', require('./controllers/languageController'))

app.listen(PORT, () => {
	console.log('Server is listening')
  })

  //localhost:3060/languages
