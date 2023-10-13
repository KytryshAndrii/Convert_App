import React, { Fragment } from "react"

function FileInput({onChange}){
    return(
        <Fragment>
             <input type="file" id="files" name="files" onChange={(e)=>{onChange(e)}} multiple/>
        </Fragment>
    );
}

export default FileInput;