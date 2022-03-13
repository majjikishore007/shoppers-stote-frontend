import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    console.log(history.location.pathname);
    return { color: '#50DBB4' };
  } else {
    return { color: 'white' };
  }
};

const NavBar = ({ history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              {' '}
              <Link
                style={currentTab(history, '/')}
                className='nav-link'
                to='/'
              >
                Home
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {isAuthenticated() && (
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    style={currentTab(history, '/cart')}
                    to='/cart'
                  >
                    Cart
                  </Link>
                </li>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    style={currentTab(history, '/user/dashboard')}
                    to='/user/dashboard'
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    style={currentTab(history, '/admin/dashboard')}
                    to='/admin/dashboard'
                  >
                    AdminDashboard
                  </Link>
                </li>
              )}
              {!isAuthenticated() && (
                <>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      style={currentTab(history, '/signup')}
                      to='/signup'
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      style={currentTab(history, '/signin')}
                      to='/signin'
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated() && (
                <li className='nav-item'>
                  <span
                    className='nav-link text-warning'
                    onClick={() => {
                      signout(() => {
                        history.push('/');
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}></Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
};
export default withRouter(NavBar);
