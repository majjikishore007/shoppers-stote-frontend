import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import Base from '../core/Base';

const Signin = (props) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const performRedirect = () => {
    if (didRedirect) {
      console.log('role :::::', user.role);
      if (user && user.role === 1) {
        return <Redirect to='/' />;
      } else {
        return <Redirect to='/' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/'></Redirect>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log('signin request failed'));
  };

  const signInForm = () => {
    return (
      <Flex
        minH={'80vh'}
        align={'center'}
        textAlign={'center'}
        justify={'center'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box rounded={'lg'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={handleChange('email')}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={handleChange('password')}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  onClick={onSubmit}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  };

  return (
    <Base title='signin page' description='signin here '>
      {error && <Error values={values} setValues={setValues}></Error>}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
