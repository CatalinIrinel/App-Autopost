import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Store } from '../contexts/ContextProvider';

const Navbar = ({ toggle }) => {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = state;

  const signoutHandler = () => {
    // ctxDispatch({ type: 'USER_SIGNOUT' });
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
      <HStack w={'full'} maxW={'90rem'}>
        <Tooltip hasArrow label={'Menu'} placement={'bottom'}>
          <HamburgerIcon fontSize={'2rem'} onClick={toggle} />
        </Tooltip>
        <Tooltip hasArrow label={'Profile'} placement={'bottom'}>
          <Avatar
            size={'md'}
            // name={`${userInfo.lastName} ${userInfo.firstName}`}
            // src={`${userInfo.profilePicture}`}
          />
        </Tooltip>
        <Menu>
          <Tooltip hasArrow label={'User Menu'} placement={'bottom'}>
            <MenuButton rightIcon={<ChevronDownIcon />}>Hi,</MenuButton>
          </Tooltip>
          <Link to={'/user'}>
            <MenuList>User Info</MenuList>
          </Link>
          <Link to={'/user/abonament'}>
            <MenuList>Date Abonament</MenuList>
          </Link>
          <MenuDivider />
          <MenuList onClick={signoutHandler}>Delogare</MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Navbar;
