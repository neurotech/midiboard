var midi = require('midi');
var config = require('./config.json');

// Setup virtual MIDI output
var output = new midi.output();
output.openVirtualPort('Soundboard MIDI Controller');

// Note builders
var noteOn = function(note) {
  var noteStructure = [];
  noteStructure.push(config.generic.noteOn);
  noteStructure.push(note);
  noteStructure.push(config.generic.velocity);
  return noteStructure;
};

var noteOff = function(note) {
  var noteStructure = [];
  noteStructure.push(config.generic.noteOff);
  noteStructure.push(note);
  noteStructure.push(config.generic.velocity);
  return noteStructure;
};

var noteSend = function(state, note) {
  var noteStructure = [];
  noteStructure.push(note, config.generic.velocity);
  if (state === 'on') {
    noteStructure.unshift(config.generic.noteOn);
    return noteStructure;
  }
  if (state === 'off') {
    noteStructure.unshift(config.generic.noteOff);
    return noteStructure;
  }
};

// Send a 'note on'
setInterval(function() {
  output.sendMessage(noteSend('on', config.rows.first.one));
}, 1000);

// Then send a 'note off'
setInterval(function() {
  output.sendMessage(noteSend('off', config.rows.first.one));
}, 2000);