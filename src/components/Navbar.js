import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import NavLink from './NavLink';

const Navbar = ({ props, history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  let mainLinks = null;
  if (isAuthenticated() && isAuthenticated().user.role === 1) {
    mainLinks = (
      <>
        <NavLink url={'/admin/dashboard'}>Dashboard</NavLink>
      </>
    );
  } else if (isAuthenticated() && isAuthenticated().user.role === 0) {
    mainLinks = (
      <>
        <NavLink url={'/user/dashboard'}>Dashboard</NavLink>
      </>
    );
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            _focus={{ boxShadow: 'none', outline: 'none' }}
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <NavLink url={'/'}>ShoppersStop</NavLink>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLink url={'/cart'}>Cart</NavLink>
              {mainLinks}
            </HStack>
          </HStack>
          <Flex alignItems={'center'} mr={4}>
            <Menu>
              <MenuButton
                _focus={{ boxShadow: 'none', outline: 'none' }}
                textDecoration={'none'}
                p={2}
                mr={4}
                fontSize={18}
              >
                Signin
              </MenuButton>
              <MenuList textDecoration={'none'}>
                {!isAuthenticated() && (
                  <>
                    <MenuItem textDecoration={'none'}>
                      <NavLink url={'/signup'}>Register</NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink url={'/signin'}>Login</NavLink>
                    </MenuItem>
                  </>
                )}
                {isAuthenticated() && (
                  <>
                    <MenuItem>
                      <span
                        onClick={() => {
                          signout(() => {
                            history.push('/');
                          });
                        }}
                      >
                        Logout
                      </span>
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
            <Button
              aria-label='Toggle Color Mode'
              onClick={toggleColorMode}
              _focus={{ boxShadow: 'none', outline: 'none' }}
              w='fit-content'
              {...props}
            >
              {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink url={'/cart'}>Cart</NavLink>
              {mainLinks}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
export default withRouter(Navbar);
