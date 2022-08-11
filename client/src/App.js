import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'; 
import Canvas from "./components/Canvas"; // Change the path according to the directory structure of your project

// storing socket connection in this global variable
let socket = null;

function plusXPositionUpdate() {
  // we emit this event that increments the count on the server
  // and the updated count is emitted back via 'counter updated'
  socket.emit('plus clicked');
}
function minusXPositionUpdate(){
  // we emit this event that increments the count on the server
  // and the updated count is emitted back via 'counter updated'
  socket.emit('minus clicked');
}

function App() {
  const [pointX, setCount] = useState(0);

  const draw = (context) => {

    //context.fillStyle = "rgb(200, 0, 0)";
    //context.fillRect(10, 10, 50, 50);
  
    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(pointX, 50, 50, 50);
  };

  // after component mount...
  useEffect(() => {
    // connect to the socket server
    socket = io('ws://localhost:5000');

    // when connected, look for when the server emits the updated count
    socket.on('plus counter updated', function(countFromServer) {
      // set the new count on the client
      setCount(countFromServer);
    })
    
    socket.on('minus counter updated', function(countFromServer) {
      // set the new count on the client
      setCount(countFromServer);
    })

  }, []);
  return (
    <div>
      <div>
        <Canvas draw={draw} height={500} width={500} />
      </div>
      <div>
        <button onClick={plusXPositionUpdate}>xPoint+: {pointX}</button>
        <button onClick={minusXPositionUpdate}>xPoint-: {pointX}</button>
      </div>
    </div>
  );
}
export default App;
