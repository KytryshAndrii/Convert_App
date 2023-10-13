import React from "react";
import video_extentios from "../../options/videoOptions";
import Select from 'react-select';

function SelectVideoFormatButton({value, onChange, isDisabled}){

    return (
        <Select
        value={value}
        onChange={event => onChange(event)}
        options={video_extentios}
        placeholder= "Choose extention"
        isSearchable= {true}
        isDisabled ={isDisabled}
      />
    );
}

export default SelectVideoFormatButton;