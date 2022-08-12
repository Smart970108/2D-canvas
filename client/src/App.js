import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Canvas from "./components/Canvas"; // Change the path according to the directory structure of your project

import './styles.css';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
// storing socket connection in this global variable
let socket = null;

function start() {
  // we emit this event that increments the count on the server
  // and the updated count is emitted back via 'counter updated'
  socket.emit('start clicked');
}
function onChange(newValue) {
  socket.emit('getEditor', newValue);
}

function App() {
  const [position, setPosition] = useState();
  const [current, setCurrent] = useState();

  const draw = (context) => {
    if (!current || !position) return;
    console.log("draw", current, position)

    var imgData = context.createImageData(position.x1, position.y1);

    for (let i = 0; i < current.length; i += 4) {
      imgData.data[i + 0] = current[i].red;
      imgData.data[i + 1] = current[i].green;
      imgData.data[i + 2] = current[i].blue;
      imgData.data[i + 3] = 100;
    }
    context.putImageData(imgData, position.x2, position.y2);
  };

  // after component mount...
  useEffect(() => {
    // connect to the socket server
    socket = io('ws://localhost:8001');

    // when connected, look for when the server emits the updated count
    socket.on('start updated', function (data) {
      // set the new count on the client
      setCurrent(data.current);
      setPosition(data.position)
    })

  }, []);
  return (
    <div>
      <div>
        <Canvas draw={draw} height={250} width={1000} />
      </div>
      <div>
        <button onClick={start} className='button'>Start</button>
      </div>
      <div>
        <AceEditor
          className='box'
          mode="java"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
}
export default App;