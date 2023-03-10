import React from 'react';
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: '#3383bc',
        '&:hover': {
          backgroundColor: '#15364e',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    ></Box>
  );
};

export default Home;
