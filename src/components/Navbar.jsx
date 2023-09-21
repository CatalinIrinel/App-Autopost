import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../contexts/ContextProvider';

const Navbar = ({ toggle }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <HStack
      w={'full'}
      h={'60px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        w={'full'}
        maxW={'90rem'}
        justifyContent={'space-between'}
        px={{ base: '3rem', '2xl': 0 }}
      >
        <Tooltip hasArrow label={'Menu'} placement={'bottom'}>
          <HamburgerIcon fontSize={'2rem'} onClick={toggle} />
        </Tooltip>

        {userInfo ? (
          <Menu>
            <Tooltip hasArrow label={'User Menu'} placement={'bottom'}>
              <MenuButton rightIcon={<ChevronDownIcon />}>
                <Flex alignItems={'center'} gap={'.5rem'}>
                  {' '}
                  <Avatar
                    size={'md'}
                    name={`${userInfo.lastName} ${userInfo.firstName}`}
                    src={`${userInfo.profilePicture}`}
                  />
                  Buna, {userInfo.firstName}
                </Flex>
              </MenuButton>
            </Tooltip>

            <MenuList>
              <Link to={'/user'}>
                <MenuItem>User Info</MenuItem>
              </Link>

              <Link to={'/user/abonament'}>
                <MenuItem>Date Abonament</MenuItem>
              </Link>

              <MenuDivider />
              <MenuItem onClick={signoutHandler}>Delogare</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to={'/logare'}>Logare</Link>
        )}
      </Flex>
    </HStack>
  );
};

export default Navbar;
