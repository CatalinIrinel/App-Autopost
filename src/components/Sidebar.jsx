import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Image,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggle, isOpen }) => {
  return (
    <Box
      w={'20rem'}
      transform={`translateX(${isOpen ? '0' : '-22rem'})`}
      height={'100vh'}
      position={'fixed'}
      zIndex={100000}
      top={0}
      left={0}
      display={'flex'}
      flexDir={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      gap={'3rem'}
      bg={'linear-gradient(90deg, #2a4365, #3182ce)'}
      color={'text'}
      transition={'all .8s ease-in-out'}
      padding={'1.5rem 2rem'}
      boxShadow={useColorModeValue(
        '8px 0 1rem rgba(0,0,0,0.3)',
        '0 0 1.5rem rgba(255,255,255,0.2)'
      )}
      fontSize={'1.25rem'}
      className="sidebar"
      overflowY={'auto'}
    >
      <Box
        w={'full'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Link to="/">
          <Image width={'150px'} src={'/images/LogoFinal-W.png'} />
        </Link>
        <CloseIcon onClick={toggle} color={'#fff'} />
      </Box>
      <UnorderedList
        w={'full'}
        m={0}
        listStyleType={'none'}
        display={'flex'}
        flexDir={'column'}
        color={'titleLight'}
      >
        <ListItem
          color={useColorModeValue('titleLight', 'secondaryDark')}
          fontWeight={'bold'}
          textDecoration={'underline'}
          fontSize={'1rem'}
        >
          <Link to="/" onClick={toggle}>
            Conecteaza profilele
          </Link>
        </ListItem>
      </UnorderedList>
      <UnorderedList
        m={0}
        listStyleType={'none'}
        display={'flex'}
        flexDir={'column'}
        gap={'1rem'}
        color={'titleLight'}
      >
        <ListItem
          color={useColorModeValue('titleLight', 'titleDark')}
          fontWeight={'bold'}
          textDecoration={'underline'}
          fontSize={'1rem'}
        >
          Post on
        </ListItem>
        {[
          { text: 'facebook', link: '/facebook' },
          { text: 'instagram', link: '/instagram' },
          { text: 'tiktok', link: '/tiktok' },
          { text: 'pinterest', link: '/pinterest' },
          { text: 'linkedIn', link: '/linkedin' },
          { text: 'Youtube', link: '/youtube' },
        ].map((item, index) => (
          <ListItem textTransform={'capitalize'} key={index}>
            <Link onClick={toggle} to={`${item.link}`}>
              {item.text}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
      <UnorderedList
        m={0}
        listStyleType={'none'}
        display={'flex'}
        flexDir={'column'}
        gap={'1rem'}
        color={'titleLight'}
      >
        <ListItem
          color={useColorModeValue('titleLight', 'titleDark')}
          fontWeight={'bold'}
          textDecoration={'underline'}
          fontSize={'1rem'}
        >
          Apps
        </ListItem>
        {[
          { text: 'Programeaza postari', link: 'scheduler' },
          { text: 'workflow', link: 'workflow' },
          { text: 'calendar', link: 'scheduler' },
        ].map((item, index) => (
          <ListItem textTransform={'capitalize'} key={index}>
            <Link onClick={toggle} to={`/${item.link}`}>
              {item.text}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>

      {/* <UnorderedList
        m={0}
        listStyleType={'none'}
        display={'flex'}
        flexDir={'column'}
        gap={'1rem'}
        color={'titleLight'}
      >
        <ListItem
          color={useColorModeValue('titleLight', 'secondaryDark')}
          fontWeight={'bold'}
          textDecoration={'underline'}
          fontSize={'1rem'}
        >
          <Link to={'/statistics'}>Statistici</Link>
        </ListItem>
        {[
          { text: 'facebook', link: 'statistics/facebook' },
          { text: 'instagram', link: 'statistics/instagram' },
          { text: 'tiktok', link: 'statistics/tiktok' },
        ].map((item, index) => (
          <ListItem textTransform={'capitalize'} key={index}>
            <Link onClick={toggle} to={`/${item.link}`}>
              {item.text}
            </Link>
          </ListItem>
        ))}
      </UnorderedList> */}
    </Box>
  );
};

export default Sidebar;
