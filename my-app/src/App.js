import {React, useEffect, useState, Fragment} from "react"; 
import { createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import JSZip from "jszip";
import {saveAs} from "file-saver"
import Loader from "./components/loaders/Loader";
import TextComponent from "./components/text/TextComponent";
import MainIntarface from "./components/interface/MainIntarface";
import "./index.css"

const ffmpeg = createFFmpeg({log: false});

function App() {

  const [processtate, setProcesstate] = useState(0);
  
  const [selectedExtention, setSelectedExtention] = useState("");
  const [extention, setExtention] = useState("");

  const [videoFiles, setVideoFiles] = useState([]);
  const [ready, setReady] = useState(false);
  const [converted, setConverted] = useState(false);

  const[counter, setCounter] = useState(0);

  const[timeout, setTimeout] = useState(0);

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
      setCounter(videoFiles.length)
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
    let start = Date.now();
    const filename = 'test.'+ extention;
    const out_filename = 'out'+ selectedExtention.value;

    for(let i = 0; i < Object.keys(videoFiles).length; i++){

      setProcesstate(i);

      ffmpeg.FS('writeFile', filename, await fetchFile(videoFiles[i]));

      if(selectedExtention.value == '.avif'){
        await ffmpeg.run("-i", filename,  "-c:v", "libaom-av1", out_filename);
      }else if(selectedExtention.value == '.png' || selectedExtention.value == '.jpg'){
        await ffmpeg.run("-i", filename,  out_filename); 
      }else{ 
        await ffmpeg.run("-i", filename,  "-vcodec", "copy", "-acodec", "copy", out_filename);
    }
    const data = ffmpeg.FS('readFile', out_filename);

    const url = URL.createObjectURL(new Blob([data.buffer]));
    readyFiles[i] = url;

  }
    setTimeout(Date.now() - start);
    setConverted(false);
    generateZip(readyFiles, selectedExtention.value);
}

  return ready ? (
    <div className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400
    background-animate flex items-center justify-center flex-col h-screen w-full" >
    <TextComponent/>
    <MainIntarface
      onChange={setFiles}
      onChangeSelect={setSelectedExtention}
      value={selectedExtention}
      extention={extention}
      counter={counter}
      timeout={timeout}
      files={videoFiles}
      onClick={checkDestination}
      state={processtate}
      converted={converted}
      />
    </div>
  ) : (<Loader/>)
}

export default App;