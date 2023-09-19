import {React, useEffect, useState} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import JSZip from "jszip";
import {saveAs} from "file-saver"

const ffmpeg = createFFmpeg({log: true});


function App() {

  const [videoFiles, setVideoFiles] = useState();

  const readyVideos = [];

  const [ready, setReady] = useState(false);

  async function load (){
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(()=>{
    load();
  }, [])



  async function convertFunction(){

  const zip = new JSZip();
    //console.log(videoFiles)
  for(let i = 0; i < Object.keys(videoFiles).length; i++){
   ffmpeg.FS('writeFile', 'test.mov', await fetchFile(videoFiles[i]));

   await ffmpeg.run("-i", 'test.mov',  "-vcodec", "copy", "-acodec", "copy", 'out.mp4');
//'-qscale', '0',
    const data = ffmpeg.FS('readFile', 'out.mp4');

    const url = URL.createObjectURL(new Blob([data.buffer], {type: "video/mp4"}));

    setReady(url);

    zip.file("out.mp4", fetchFile(url), {base64: true});
  }  
    zip.generateAsync({type: "blob"}).then(content => {
      saveAs(content, "example.zip");
    });
  

  }



  return ready ? (
    <div className="App">
      {videoFiles && <video 
                      height='500'
                      width="450"
                      src={URL.createObjectURL(videoFiles[0])}
                      type="video/mov"
                      controls
                      >
                      </video>}
      <p>FFMPEG is COOL!</p>
      <input type="file" id="files" name="files" onChange={(e)=> setVideoFiles(e.target.files)} multiple/>
      <button onClick={convertFunction}>Convert</button>
     {ready && <video src={ready} height='500' width='450' type="video/mp4" controls />}
    </div>
  ) : (<p>Loading .....</p>)
}

export default App;
