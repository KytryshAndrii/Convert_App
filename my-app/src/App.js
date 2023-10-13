import {React, useEffect, useState, Fragment} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import JSZip from "jszip";
import {saveAs} from "file-saver"
import ConvertButton from "./components/buttons/ConvertButton";
import ProcesLoader from "./components/loaders/ProcesLoader";
import Loader from "./components/loaders/Loader";
import UploadComponent from "./components/uploadcomponent/UploadComponent";
import "./index.css"

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
    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
    background-animate flex items-center justify-center h-screen w-full" >
      <div className="bg-white shadow-md p-8 w-full max-w-md  h-1/3 rounded-lg shadow-4xl"> 
     <UploadComponent onChange={setFiles} onChangeSelect={setSelectedExtention} value={selectedExtention} extention={extention}/>
     <ConvertButton onClick={checkDestination}/>
      {converted?<ProcesLoader
                    state={processtate}
                    total={Object.keys(videoFiles).length}
                  />:<Fragment></Fragment>}
      </div>
    </div>
  ) : (<div className="flex items-center justify-center h-screen"><Loader></Loader></div>)
}

export default App;