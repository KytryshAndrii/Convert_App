import React from "react";
//import { writeFile } from 'fs/promises';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


function App() {

  function convertFunction(e){
    const files = Array.from(e.target.files)
    console.log("files:", files)
  }

  return (
    <div className="App">

      <p>FFMPEG is COOL!</p>
      <input type="file" id="files" name="files" accept="video/mov" onChange={convertFunction} multiple/>

    </div>
  );
}

export default App;
