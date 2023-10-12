import React from "react";
import UploaderButton  from "../img/upload.png";
import styles from "./UploadButton.module.css"

function UploadButton({onChange}){
    return(
        <div id={styles.fileuploaderwrapp}>
            <img id={styles.img} src={UploaderButton}/>
            <input type="file" id={styles.files} name="files" onChange={(e)=> onChange(e)} multiple/>
        </div>
    );
}

export default UploadButton;