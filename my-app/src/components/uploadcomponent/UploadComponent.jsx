import React from "react";
import UploadButton from "../buttons/UploadButton";
import SelectExtentionModule from "../selects/SelectExtentionModule";

function UploadComponent({onChange, extention, value, onChangeSelect}){
    return(
        <div className="flex justify-between  w-full h-1/2">
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