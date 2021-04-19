// Imports the Google Cloud client library
const GoogleTextToSpeech = require('@google-cloud/text-to-speech');
const express = require('express')
const textToSpeech = express.Router()

const TOKEN_ARG = 2;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = './token.json'

// Import other required libraries
const fs = require('fs');
const util = require('util');

// Creates a client
const client = new GoogleTextToSpeech.TextToSpeechClient();

async function quickStart() {
  // The text to synthesize
  const text = 'hello, world!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();

module.exports = textToSpeech;