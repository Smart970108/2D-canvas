const io = require('socket.io')(5000);

// the xPoint state
let current = {
  x:0,
  red:0,
  green:0,
  blue:0
};

io.on('connect', function(socket) {
  // emit to the newly connected client the existing xPoint 
  socket.emit('counter updated', current);

  // we listen for this event from the clients
  socket.on('plus clicked', () => {
    // increment the count
    for (let index = 0; index < 1000; index++) {
      // emit to EVERYONE the updated xPoint
      current.x += 0.05;
      current.red = Math.floor(Math.random() * 200) + 1;
      current.green = Math.floor(Math.random() * 200) + 1;
      current.blue = Math.floor(Math.random() * 200) + 1;
      io.emit('plus counter updated', current);
    }
  });

  socket.on('minus clicked', () => {
    // increment the xPoint
    for (let index = 0; index < 1000; index++) {
      // emit to EVERYONE the updated xPoint
      current.x -= 0.05;
      current.red = Math.floor(Math.random() * 200) + 1;
      current.green = Math.floor(Math.random() * 200) + 1;
      current.blue = Math.floor(Math.random() * 200) + 1;
      io.emit('minus counter updated', current);
    }
    // emit to EVERYONE the updated count
    
  });
});