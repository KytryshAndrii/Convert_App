import React from "react";
import styles from "./loaderstyle.module.css";

function Loader(){
    return(
        <div className="flex items-center justify-center h-screen">
            <div id={styles.loader}></div>
        </div>
    )
}

export default Loader;