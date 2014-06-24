var socket = io('http://localhost:8888');

$('#tiles div').click(function() {
  var note = $(this).attr("title");
  socket.emit('button', note);
});