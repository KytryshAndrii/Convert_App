import React from "react";
import UploaderButton  from "../img/upload.png";

function UploadButton({onChange}){
    return(
        <div className=" relative overflow-hidden inline-block w-30">
            <img className="w-30 h-24 rounded-md  border-dashed border-2 border-gray-800"  src={UploaderButton}/>
            <input type="file" className="w-20 h-20 absolute left-0 top-0 opacity-0" name="files" onChange={(e)=> onChange(e)} multiple/>
        </div>
    );
}

export default UploadButton;