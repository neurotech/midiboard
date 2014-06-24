var config = require('./config.json');
var midi = require('midi');
var express = require('express');
var sockets = require('socket.io');
var path = require('path');

// Express
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var server = app.listen(config.server.port, function() {
  console.log('Express server listening on port ' + config.server.port);
});

// socket.io
var io = sockets.listen(server);

io.on('connection', function (socket) {
  socket.on('button', function (note) {
    output.sendMessage(noteSend('on', note));
    setTimeout(function() {
      output.sendMessage(noteSend('off', note));
    }, 500);
  });
});

// MIDI
// Setup virtual MIDI output
var output = new midi.output();
output.openVirtualPort('Soundboard MIDI Controller');

// Return appropriate note array
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