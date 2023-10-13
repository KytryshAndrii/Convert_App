import {React, Fragment} from "react";
import SelectFormatButton from "./SelectPhotoFormat";
import SelectVideoFormatButton from "./SelectVideoFormat";


function SelectExtentionModule({extention, value, onChange}){

    const photo_format = ["jpg", "png", "avif"];
    var isDisabled = true;

    return( 
    <div className="mt-8">
    {extention? isDisabled = false: <></>}
    {photo_format.includes(extention) ? 
        <Fragment>
            <SelectFormatButton
                value = {value}
                onChange={onChange}
                isDisabled={isDisabled}
            />
        </Fragment> :
        <Fragment>
            <SelectVideoFormatButton
                value = {value}
                onChange={onChange}
                isDisabled={isDisabled}
                />
        </Fragment>
        }
    </div>)
}

export default SelectExtentionModule;