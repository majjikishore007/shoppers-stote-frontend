import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const Base = ({ children }) => {
  return (
    <Box>
      <Navbar></Navbar>
      <Box p={8} minH={'100vh'}>
        {children}
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default Base;
