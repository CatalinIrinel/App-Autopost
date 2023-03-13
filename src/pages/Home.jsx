import {
  Heading,
  HStack,
  Icon,
  Stack,
  Button,
  Divider,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';
import { Store } from '../contexts/ContextProvider';

const fbLoginHandler = () => {
  console.log('it works');
};

const Home = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      pt={'50px'}
      gap={'3rem'}
    >
      <Heading as={'h1'} fontSize={'3rem'}>
        Bun Venit!
      </Heading>
      <Stack w={'full'} maxW={'90rem'} gap={'3rem'} pb={'2rem'} color={''}>
        <Heading as={'h2'}>
          Conecteaza conturile pe care doresti sa le gestionezi
        </Heading>
        <HStack
          w={'full'}
          gap={'2rem'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            w={'250px'}
            h={'50px'}
            onClick={fbLoginHandler}
            _hover={{ bg: 'facebook.700' }}
            _active={'none'}
            bg={'facebook.500'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            disabled={userInfo.facebookData}
          >
            <Icon as={FaFacebook} fontSize={'1.5rem'} />
            &nbsp; Login with Facebook
          </Button>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={fbLoginHandler}
            _hover={{ bg: '#a0214b' }}
            _active={'none'}
            bg={'#E1306C'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            disabled={userInfo.instagramData}
          >
            <Icon as={FaInstagram} fontSize={'1.5rem'} />
            &nbsp;Instagram Login
          </Button>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={fbLoginHandler}
            _hover={{ bg: 'twitter.700' }}
            _active={'none'}
            bg={'twitter.500'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            disabled={userInfo.twitterData}
          >
            <Icon as={FaTwitter} fontSize={'1.5rem'} />
            &nbsp;Twitter Login
          </Button>
        </HStack>
        <Divider borderWidth={'medium'} borderColor={'#000'} />
        <HStack
          w={'full'}
          gap={'2rem'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            w={'250px'}
            h={'50px'}
            onClick={fbLoginHandler}
            _hover={{ bg: '#000' }}
            _active={'none'}
            bg={'#383838'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            disabled={userInfo.tiktokData}
          >
            <Icon as={FaTiktok} fontSize={'1.5rem'} />
            &nbsp;Tiktok Login
          </Button>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={fbLoginHandler}
            _hover={{ bg: 'linkedin.700' }}
            _active={'none'}
            bg={'linkedin.500'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            disabled={userInfo.linkedinData}
          >
            <Icon as={FaLinkedinIn} fontSize={'1.5rem'} />
            &nbsp;LinkedIn Login
          </Button>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={fbLoginHandler}
            _hover={{ bg: 'red.700' }}
            _active={'none'}
            bg={'red.500'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            disabled={userInfo.youtubeData}
          >
            <Icon as={FaYoutube} fontSize={'1.5rem'} />
            &nbsp;Youtube Login
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Home;
