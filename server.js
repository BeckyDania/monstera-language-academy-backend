require('dotenv').config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODBURI
const express = require('express')
const session = require('express-session')
const app = express()

const cors = require('cors')

const whitelist = ['http://localhost:3060']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions)) // all routes are now exposed

//Setup Mongoose
const mongoose = require('mongoose');

//middleware
app.use(express.json()); //use .json(), not .urlencoded()


// set up connection with the DB
mongoose.connect(mongodbURI,{
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

app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)

//controllers
app.use('/languages', require('./controllers/languageController'))
app.use('/users', require('./controllers/userController.js'))
app.use('/sessions', require('./controllers/sessionController.js'))
app.use('/translations', require('./controllers/googleTranslate'))
app.use('/textToSpeech', require('./controllers/googleTextToSpeech'))


 app.listen(PORT, () => {
	console.log('Server is listening on port', PORT)
  })

  //localhost:3060/languages
