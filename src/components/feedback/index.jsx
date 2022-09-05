import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

const Loader = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexWrap="wrap"
      flexDirection="column"
    >
      <CircularProgress color="secondary" />
      <Typography variant="h6" style={{ marginTop: 16 }}>
        {props.content}
      </Typography>
    </Box>
  );
};

Loader.defaultProps = {
  content: 'Mengambil data...',
};

export default Loader;
