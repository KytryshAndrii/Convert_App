import React from "react";
import UploaderButton  from "../img/upload.png";

function UploadButton({onChange}){
    return(
        <div className="m-2 ml-4 relative overflow-hidden inline-block w-30 h-30 shadow-3xl">
            <img className="w-24 h-24 rounded-md" src={UploaderButton}/>
            <input type="file" className="w-20 h-20 absolute left-0 top-0 opacity-0" name="files" onChange={(e)=> onChange(e)} multiple/>
        </div>
    );
}

export default UploadButton;