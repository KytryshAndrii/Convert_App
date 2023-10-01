import {React, Fragment} from "react";
import SelectFormatButton from "./SelectPhotoFormat";
import SelectVideoFormatButton from "./SelectVideoFormat";


function SelectExtentionModule({extention, value, onChange}){

    const photo_format = ["pdf", "jpg", "png"];

    return photo_format.includes(extention) ? (
        <Fragment>
            <SelectFormatButton
                value = {value}
                onChange={onChange}
            />
        </Fragment>
        ):(
        <Fragment>
            <SelectVideoFormatButton
                value = {value}
                onChange={onChange}
                />
        </Fragment>
    );
}

export default SelectExtentionModule;