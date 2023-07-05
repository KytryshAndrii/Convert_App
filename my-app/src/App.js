import {React, useEffect, useState} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({log: true});


function App() {

  const [videoFiles, setVideoFiles] = useState();

  const [readyVideos, setReadyVideos] = useState();

  const [ready, setReady] = useState(false);

  async function load (){
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(()=>{
    load();
  }, [])

  async function convertFunction(){

   ffmpeg.FS('writeFile', 'test.mov', await fetchFile(videoFiles));

   await ffmpeg.run("-i", 'test.mov', "-vcodec", "copy", "-acodec", "copy", 'out.mp4');
//'-qscale', '0',
    const data = ffmpeg.FS('readFile', 'out.mp4');

    const url = URL.createObjectURL(new Blob([data.buffer], {type: "video/mp4"}));

    setReady(url);

  }

  return ready ? (
    <div className="App">
      {videoFiles && <video 
                      height='500'
                      width="450"
                      src={URL.createObjectURL(videoFiles)}
                      type="video/mov"
                      controls
                      >
                      </video>}
      <p>FFMPEG is COOL!</p>
      <input type="file" id="files" name="files" onChange={(e)=> setVideoFiles(e.target.files[0])} multiple/>
      <button onClick={convertFunction}>Convert</button>
     {ready && <video src={ready} height='500' width='450' type="video/mp4" controls />}
    </div>
  ) : (<p>Loading .....</p>)
}

export default App;
