import React, {Fragment} from "react";
import ConvertButton from "../buttons/ConvertButton";
import UploadComponent from "../uploadcomponent/UploadComponent";
import UploadInfoComponent from "../uploadcomponent/UploadInfoComponent";
import ProcesLoader from "../loaders/ProcesLoader";

function MainIntarface({onChange, onChangeSelect, value, extention, counter, timeout, files, onClick, state, converted}){
    return(
        <div className="flex items-center justify-center flex-col bg-gray-50 p-8 mt-[4rem] w-full max-w-3xl h-[32rem] rounded-lg shadow-4xl"> 
            <UploadComponent onChange={(e)=>{onChange(e)}} onChangeSelect={onChangeSelect} value={value} extention={extention}/>
            <UploadInfoComponent counter={counter} timeout={timeout} files={files}/>
            <ConvertButton onClick={onClick}/>
            {converted?<ProcesLoader
                        state={state}
                        total={Object.keys(files).length}
                     />:<Fragment></Fragment>}
         </div>
    );
}

export default MainIntarface;