import {React, useState} from "react"; 
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";


function App() {

  const [videoFiles, setVideoFiles] = useState({})

  function convertFunction(e){
    const files = Array.from(e.target.files)
    console.log("files:", files)
    setVideoFiles(files)
  }

  return (
    <div className="App">

      <p>FFMPEG is COOL!</p>
      <input type="file" id="files" name="files" accept="video/mov" onChange={convertFunction} multiple/>

    </div>
  );
}

export default App;
