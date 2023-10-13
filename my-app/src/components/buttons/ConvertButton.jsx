import React from "react";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[800],
      },
    },
  });


function ConvertButton({onClick}){
    return(
      <div className="pl-21 mt-8 ml-2">
        <ThemeProvider theme={theme}>
            <Button variant="outlined" startIcon={<RotateRightIcon />} onClick={onClick} color="primary" size="large">
                Convert Files
            </Button>
        </ThemeProvider>
      </div>
    );
}

export default ConvertButton;