import {React, useEffect, useState} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import JSZip from "jszip";
import {saveAs} from "file-saver"
import SelectExtentionModule from "./components/selects/SelectExtentionModule";

const ffmpeg = createFFmpeg({log: true});

function App() {

  const [selectedExtention, setSelectedExtention] = useState("");
  const [extention, setExtention] = useState("");

  const [videoFiles, setVideoFiles] = useState([]);
  const [ready, setReady] = useState(false);

  const readyVideos = {};

  function setFiles(e){
    e.preventDefault()
    setVideoFiles(e.target.files)
  };

  useEffect(() => { 
    if(Object.keys(videoFiles).length > 0)
    {
      getExtension(videoFiles[0].name)
    } }, [videoFiles])

  async function getExtension(filename) {
    setExtention(filename.split('.').pop().toLowerCase());
  }

  async function load (){
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(()=>{
    load();
  }, [])

  function generateZip(file_array){
    const zip = new JSZip();
    const dist_folder = zip.folder("converted_videos");

    for(let t = 0; t < Object.keys(file_array).length; t++){
      dist_folder.file(t + ".mp4", fetchFile(file_array[t]), {base64: true});
    }

      zip.generateAsync({type: "blob"}).then(content => {
        saveAs(content, "example.zip");
      });
  }

  async function convertFunction(){

  for(let i = 0; i < Object.keys(videoFiles).length; i++){

    ffmpeg.FS('writeFile', 'test.mov', await fetchFile(videoFiles[i]));

    await ffmpeg.run("-i", 'test.mov',  "-vcodec", "copy", "-acodec", "copy", 'out.mp4');

    const data = ffmpeg.FS('readFile', 'out.mp4');

    const url = URL.createObjectURL(new Blob([data.buffer], {type: "video/mp4"}));
    readyVideos[i] = url;

  }
    generateZip(readyVideos);
}

  return ready ? (
    <div className="App">
      <input type="file" id="files" name="files" onChange={(e)=> setFiles(e)} multiple/>
      <button onClick={convertFunction}>Convert</button>
      <SelectExtentionModule
        extention={extention}
        value={selectedExtention}
        onChange={setSelectedExtention}
      />
     {ready && <video src={ready} height='500' width='450' type="video/mp4" controls />}
    </div>
  ) : (<p>Loading .....</p>)
}

export default App;
