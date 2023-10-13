import React from "react";
import Skeleton from '@mui/material/Skeleton';

function UploadInfoComponent({counter, timeout, files}){
    return(
        <div className="mb-2 p-4 h-[36%]">
            {timeout ? 
                <p>ffmpeg converted files in : {timeout}ms</p>
                :<p>Uploded Files Number: {counter}</p>
            }
            {counter? <div className="overflow-y-scroll scroll-smooth h-32 m-2 p-4 rounded-s shadow-1.5xl"><ul>
                    {Object.keys(files).map((val, index) => {
                        return (
                            <li key={index}>
                            <span>{files[index].name}</span>
                            </li>
                        );
                    })}
                    </ul></div>:<><Skeleton animation="wave"/><Skeleton animation="wave"/><Skeleton animation="wave"/><Skeleton animation="wave"/><Skeleton animation="wave"/></>}
        </div>
    );
}

export default UploadInfoComponent;