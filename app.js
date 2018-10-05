const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('./io').initialize(server);
const detectFaces = require('./detectFaces');
const randomSpeak = require('./randomSpeak');
const polly = require('./textToSpeech');

const port = 8000;
app.use(express.static('client'));
app.use(bodyParser.text());

app.post('/speak', function(req, res) {
	console.log('received request: ' + req.body);
	polly.speak(req.body);
	res.send(req.body);
});

app.post('/identify', function(req, res) {
	console.log('received identify request');
	detectFaces.identify();
	res.send(req.body);
});

app.post('/startRandomlySpeaking', function(req, res) {
	console.log('started randomly speaking');
	randomSpeak.startRandomlySpeaking();
	res.send(req.body);
});

app.post('/stopRandomlySpeaking', function(req, res) {
	console.log('stop randomly speaking');
	randomSpeak.stopRandomlySpeaking();
	res.send(req.body);
});

server.listen(port, function() {
  console.log('Listening on port ' + port);
});

detectFaces.on('rekognized', function(text) {
	polly.speak(text);
});

randomSpeak.on('phrase-choosen', function(text) {
	polly.speak(text);
});
