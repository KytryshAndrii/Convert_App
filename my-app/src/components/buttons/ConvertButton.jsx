import React from "react";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      },
    },
  });


function ConvertButton({onClick}){
    return(
        <ThemeProvider theme={theme}>
            <Button variant="outlined" startIcon={<RotateRightIcon />} onClick={onClick} color="primary" size="large">
                Convert Files
            </Button>
        </ThemeProvider>
    );
}

export default ConvertButton;