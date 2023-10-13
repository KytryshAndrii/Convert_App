import React from "react";
import photo_extentios from "../../options/photoOptions";
import Select from 'react-select';

function SelectFormatButton({value, onChange, isDisabled}){

    return (
        <Select
        value={value}
        onChange={event => onChange(event)}
        options={photo_extentios}
        placeholder= "Choose extention"
        isSearchable= {true}
        isClearable={isDisabled}
      />
    );
}

export default SelectFormatButton;
