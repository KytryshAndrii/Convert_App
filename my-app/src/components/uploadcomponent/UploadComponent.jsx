import React from "react";
import { Stack } from "@mui/material";
import UploadButton from "../buttons/UploadButton";
import SelectExtentionModule from "../selects/SelectExtentionModule";
import CustomSwitch from "../switch/CustomSwitch";

function UploadComponent({onChange, extention, value, onChangeSelect}){
    return(
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={0}>
            <UploadButton onChange={(e)=> onChange(e)}/>
            <CustomSwitch/>
            <SelectExtentionModule
                extention={extention}
                value={value}
                onChange={(e)=>onChangeSelect(e)}
      />
        </Stack>
    );
}

export default UploadComponent;