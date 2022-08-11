const io = require('socket.io')(5000);

// the xPoint state
let xPoint = 0;

io.on('connect', function(socket) {
  // emit to the newly connected client the existing xPoint 
  socket.emit('counter updated', xPoint);

  // we listen for this event from the clients
  socket.on('plus clicked', () => {
    // increment the count
    xPoint+=10;
    // emit to EVERYONE the updated xPoint
    io.emit('plus counter updated', xPoint);
  });

  socket.on('minus clicked', () => {
    // increment the xPoint
    xPoint-=10;
    // emit to EVERYONE the updated count
    io.emit('minus counter updated', xPoint);
  });
});