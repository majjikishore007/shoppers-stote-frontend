import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const Base = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <Box p={8}>{children}</Box>
      <Footer></Footer>
    </div>
  );
};

export default Base;
