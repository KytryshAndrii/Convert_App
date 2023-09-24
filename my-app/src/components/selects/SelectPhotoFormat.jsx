import React from "react";
import photo_extentios from "../../options/photoOptions";
import Select from 'react-select';

function SelectFormatButton({value, onChange}){

    return (
        <Select
        value={value}
        onChange={event => onChange(event)}
        options={photo_extentios}
        placeholder= "Choose extention"
        isSearchable= {true}
      />
    );
}

export default SelectFormatButton;
