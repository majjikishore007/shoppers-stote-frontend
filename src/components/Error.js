import {
  Box,
  CloseButton,
  Container,
  Icon,
  Square,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FiInfo } from 'react-icons/fi';

const Error = ({ values, setValues }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const handleChange = () => {
    setValues({ ...values, error: '' });
  };
  return (
    <Box as='section' pb={{ base: '12', md: '24' }}>
      <Box bg='bg-surface' boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container py={{ base: '4', md: '2.5' }} position='relative'>
          <CloseButton
            display={{ sm: 'none' }}
            position='absolute'
            right='2'
            top='2'
            outline={'none'}
          />
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify='space-between'
            spacing={{ base: '3', md: '2' }}
          >
            <Stack
              spacing='4'
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >
              {!isMobile && (
                <Square size='12' bg='bg-subtle' borderRadius='md'>
                  <Icon as={FiInfo} boxSize='6' />
                </Square>
              )}
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: '0.5', md: '1.5' }}
                pe={{ base: '4', sm: '0' }}
              >
                <Text fontWeight='medium' color='red'>
                  {values.error}
                </Text>
              </Stack>
            </Stack>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={{ base: '3', sm: '2' }}
              align={{ base: 'stretch', sm: 'center' }}
            >
              <CloseButton
                onClick={handleChange}
                display={{ base: 'none', sm: 'inline-flex' }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default Error;
