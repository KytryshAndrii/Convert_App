import {React, useEffect, useState} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import JSZip from "jszip";
import {saveAs} from "file-saver"
import SelectExtentionModule from "./components/selects/SelectExtentionModule";

const ffmpeg = createFFmpeg({log: true});

function App() {


  const photo_format = ["pdf", "jpg", "png", "avif"];
  const [selectedExtention, setSelectedExtention] = useState("");
  const [extention, setExtention] = useState("");

  const [videoFiles, setVideoFiles] = useState([]);
  const [ready, setReady] = useState(false);

  const readyFiles = {};

  function setFiles(e){
    e.preventDefault()
    setVideoFiles(e.target.files)
  };

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

  useEffect(() => { 
    if(Object.keys(videoFiles).length > 0)
    {
      getExtension(videoFiles[0].name)
    } }, [videoFiles])

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

    const filename = 'test'+extention;
    const out_filename = 'out'+selectedExtention

  for(let i = 0; i < Object.keys(videoFiles).length; i++){

    ffmpeg.FS('writeFile', filename, await fetchFile(videoFiles[i]));

    if(photo_format.includes(selectedExtention)){
      await ffmpeg.run("-i", filename,  "-c:v", "libjxl", out_filename);  
    }else{
      await ffmpeg.run("-i", filename,  "-vcodec", "copy", "-acodec", "copy", out_filename);
    }
    const data = ffmpeg.FS('readFile', selectedExtention);

    const url = URL.createObjectURL(new Blob([data.buffer]));
    readyFiles[i] = url;

  }
    generateZip(readyFiles);
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
