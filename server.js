const express = require('express')
const app = express()
const PORT = 3060


//controllers
app.use('/languages', require('./controllers/languageController'))

app.listen(PORT, () => {
	console.log('Server is listening')
  })