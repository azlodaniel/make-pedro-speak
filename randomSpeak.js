const fs = require('fs');
var events = require('events');
var speak = new events.EventEmitter();
module.exports = speak;

var randomPhrases = fs.readFileSync('./common/randomPhrases.txt').toString().split("\n");
var timmerRunning = false;
var timer;

module.exports.startRandomlySpeaking = function() {
    if (!timmerRunning){
        timmerRunning = true;
        randomlySpeak();
    }
}

module.exports.stopRandomlySpeaking = function() {
    timmerRunning = false;
    clearTimeout(timer)
}

function randomlySpeak() {
    var phrase = pickAPhrase(randomPhrases);
    speak.emit('phrase-choosen', phrase);
    
    timeoutDuration = getDurationNumber();
    timer = setTimeout(function() { randomlySpeak() }, timeoutDuration);
}

function pickAPhrase (phraseList) {
    var phrase = phraseList[Math.floor(Math.random() * phraseList.length)];
    return phrase;
}

function getDurationNumber() {
    var randomNumber = Math.floor((Math.random() * 100) + 1);
    var duration = randomNumber * 10000;
    console.log('duration: ', duration);
    return duration;
}