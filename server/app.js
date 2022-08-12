const io = require('socket.io')(8001);

// the xPoint state
let current = []
let position = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}
io.on('connect', function (socket) {
  // emit to the newly connected client the existing xPoint 
  socket.emit('start updated', current);

  // we listen for this event from the clients
  socket.on('start clicked', () => {
    position.x1 = Math.floor(Math.random() * 200) + 1;
    position.y1 = Math.floor(Math.random() * 200) + 1;
    position.x2 = Math.floor(Math.random() * 50) + 1;
    position.y2 = Math.floor(Math.random() * 50) + 1;

    for (let index = 0; index < position.x1 * position.x2 * 4; index++) {
      // emit to EVERYONE the updated xPoint
      current[index] = {};
      current[index].red = Math.floor(Math.random() * 200) + 1;
      current[index].green = Math.floor(Math.random() * 200) + 1;
      current[index].blue = Math.floor(Math.random() * 200) + 1;
    }
    console.log(position, current);
    io.emit('start updated', { current, position });
  });

  socket.on('getEditor', () => {
    position.x1 = Math.floor(Math.random() * 200) + 1;
    position.y1 = Math.floor(Math.random() * 200) + 1;
    position.x2 = Math.floor(Math.random() * 50) + 1;
    position.y2 = Math.floor(Math.random() * 50) + 1;

    for (let index = 0; index < position.x1 * position.x2 * 4; index++) {
      // emit to EVERYONE the updated xPoint
      current[index] = {};
      current[index].red = Math.floor(Math.random() * 200) + 1;
      current[index].green = Math.floor(Math.random() * 200) + 1;
      current[index].blue = Math.floor(Math.random() * 200) + 1;
    }
    console.log(position, current);
    io.emit('start updated', { current, position });
  });
});