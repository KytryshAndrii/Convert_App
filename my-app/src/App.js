import {React, useEffect, useState} from "react"; 
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({log: true});


function App() {

  const [videoFiles, setVideoFiles] = useState({});

  const [readyVideos, setReadyVideos] = useState();

  const [ready, setReady] = useState(false);

  async function load (){
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(()=>{
    load();
  }, [])

  async function convertFunction(e){
    const files = Array.from(e.target.files[0])
    console.log("files:", files)
    setVideoFiles(files)
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(videoFiles));
    await ffmpeg.run("-i", 'test.mp4', '-vcodec', 'copy', '-acodec', 'copy', 'out.mp4');
    const data = ffmpeg.FS("readFile", "out.mp4");

    const url = URL.createObjectURL(new Blob(data.buffer), {type: 'video/mp4'});
    setReadyVideos(url);
  }

  return ready ? (
    <div className="App">
      {videoFiles?<p>hi</p>:<p>huj</p>}
      <p>FFMPEG is COOL!</p>
      <input type="file" id="files" name="files" accept="video/mov" onChange={convertFunction} multiple/>
      <video controls 
              width='250'
              src={readyVideos}
      
      ></video>
    </div>
  ) : (<p>Loading .....</p>)
}

export default App;
