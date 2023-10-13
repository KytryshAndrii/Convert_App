import React from "react";
import UploadButton from "../buttons/UploadButton";
import SelectExtentionModule from "../selects/SelectExtentionModule";

function UploadComponent({onChange, extention, value, onChangeSelect}){
    return(
        <div className="flex justify-around  w-full h-[33%] mt-[-5rem] shadow-3xl">
            <UploadButton onChange={(e)=> onChange(e)}/>
            <SelectExtentionModule
                extention={extention}
                value={value}
                onChange={(e)=>onChangeSelect(e)}
            />
        </div>
    );
}

export default UploadComponent;