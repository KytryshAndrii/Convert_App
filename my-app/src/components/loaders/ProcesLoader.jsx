import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function LinearProgressWithLabel(props) {

  
  return (
    <Box sx={{position:"absolute", display: 'flex', alignItems: 'center', width:"47%", mt:"15px"}}>
      <Box sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">...{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


 function ProcesLoader({state, total}) {
  const MAX = total;
  const MIN = 0;

  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

return (
  <Box sx={{ width: '100%' }}>
    <LinearProgress value={normalise(state)} />
  </Box>
  );
}


export default ProcesLoader;


