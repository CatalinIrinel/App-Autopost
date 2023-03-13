import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
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
    localStorage.removeItem('paymentMethod');
  };
  return (
    <HStack
      w={'full'}
      h={'60px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <HStack w={'full'} maxW={'90rem'} justifyContent={'space-between'}>
        <Tooltip hasArrow label={'Menu'} placement={'bottom'}>
          <HamburgerIcon fontSize={'2rem'} onClick={toggle} />
        </Tooltip>
        <HStack>
          {userInfo && (
            <>
              <Menu>
                <Tooltip hasArrow label={'User Menu'} placement={'bottom'}>
                  <MenuButton rightIcon={<ChevronDownIcon />}>
                    <Avatar
                      size={'md'}
                      name={`${userInfo.lastName} ${userInfo.firstName}`}
                      src={`${userInfo.profilePicture}`}
                    />
                    Hi, {userInfo.firstName}
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
            </>
          )}
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Navbar;
