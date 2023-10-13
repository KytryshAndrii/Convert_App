import React from "react";
import AppIcon from "../img/app-icon.png"

function TextComponent(){
    return(
        <div className="flex items-center justify-center flex-col mt-10"> 
            <div className="flex flex-raw space-x-10">
            <p className="text-white font-bold text-6xl">Convert Your Files Here</p><img className="w-14 h-16" src={AppIcon}/>  
            </div>
            <br/>
            <p className="text-white font-bold text-xl">Upload your files and receive .zip archive</p>
        </div>
    );
}

export default TextComponent;