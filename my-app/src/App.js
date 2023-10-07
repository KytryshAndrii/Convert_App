import {React, useEffect, useState, Fragment} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import JSZip from "jszip";
import {saveAs} from "file-saver"
import SelectExtentionModule from "./components/selects/SelectExtentionModule";
import ProcesLoader from "./components/loaders/ProcesLoader";
import Loader from "./components/loaders/Loader";

const ffmpeg = createFFmpeg({log: true});

function App() {


  const photo_format = [".jpg", ".png", ".avif"];

  const [processtate, setProcesstate] = useState(0);
  
  const [selectedExtention, setSelectedExtention] = useState("");
  const [extention, setExtention] = useState("");

  const [videoFiles, setVideoFiles] = useState([]);
  const [ready, setReady] = useState(false);
  const [converted, setConverted] = useState(false);

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

  function generateZip(file_array, extention){
    const zip = new JSZip();
    const dist_folder = zip.folder("Converted_Files");

    for(let t = 0; t < Object.keys(file_array).length; t++){
      dist_folder.file(t + extention, fetchFile(file_array[t]), {base64: true});
    }

      zip.generateAsync({type: "blob"}).then(content => {
        saveAs(content, "example.zip");
      });
  }

  function checkDestination(){
    if(selectedExtention !== ""){
        convertFunction();
    }
    else{
      alert("Please choose extention");
    }
  }

  async function convertFunction(){
    setConverted(true);
    const filename = 'test.'+ extention;
    const out_filename = 'out'+ selectedExtention.value

  for(let i = 0; i < Object.keys(videoFiles).length; i++){

    setProcesstate(i);

    ffmpeg.FS('writeFile', filename, await fetchFile(videoFiles[i]));

    if(photo_format.includes(selectedExtention.vaue)){
      await ffmpeg.run("-i", filename,  "-c:v", "libjxl", out_filename);  
    }else{
      await ffmpeg.run("-i", filename,  "-vcodec", "copy", "-acodec", "copy", out_filename);
    }
    const data = ffmpeg.FS('readFile', out_filename);

    const url = URL.createObjectURL(new Blob([data.buffer]));
    readyFiles[i] = url;

  }
    setConverted(false);
    generateZip(readyFiles, selectedExtention.value);
}

  return ready ? (
    <div className="App" style={{display:"flex",paddingTop:"100px", top:"20%", flexDirection: "column" , alignItems:"center", alignContent:"center", width:"100%"}}>
      <input type="file" id="files" name="files" onChange={(e)=> setFiles(e)} multiple/>
      <button onClick={checkDestination}>Convert</button>
      <SelectExtentionModule
        extention={extention}
        value={selectedExtention}
        onChange={setSelectedExtention}
      />
      {converted?<ProcesLoader
                    state={processtate}
                    total={Object.keys(videoFiles).length}
                  />:<Fragment></Fragment>}
    </div>
  ) : (<div style={{display:"flex", paddingTop:"100px", flexDirection: "column" , alignItems:"center", alignContent:"center", width:"100%"}}><Loader></Loader></div>)
}

export default App;