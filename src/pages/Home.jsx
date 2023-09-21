import {
  Heading,
  HStack,
  Icon,
  Stack,
  Button,
  Divider,
  Box,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  FaFacebook,
  FaPinterestP,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useInitFbSDK } from '../hooks/fbHooks';
import { Store } from '../contexts/ContextProvider';

const Home = () => {
  // user data
  const [fbUserAccessToken, setFbUserAccessToken] = useState();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [pageToken, setPageToken] = useState('');

  const isFbSDKInitialized = useInitFbSDK();
  // const apiLink = 'https://localhost:5000';
  // const scopes =
  //   'public_profile, Page Mentions, pages_manage_posts, pages_read_engagement,publish_to_groups, instagram_basic, instagram_content_publish, pages_show_list,pages_manage_engagement,publish_video';

  // Checks if the user is logged in to Facebook

  useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
        // console.log(response.status);
      });
    }
  }, [fbUserAccessToken, isFbSDKInitialized]);

  // login to fb

  const logInToFB = React.useCallback(async () => {
    window.FB.login(
      (response) => {
        if (response.status === 'connected') {
          setFbUserAccessToken(response.authResponse.accessToken);
          toast.success('Te-ai logat cu succes pe Facebook');
        } else {
          toast.error('Logarea a esuat');
          throw new Error();
        }
      },
      {
        scope: `public_profile,pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish,pages_show_list,publish_to_groups,pages_manage_engagement,publish_video`,
      }
    );
  }, []);

  const logInToInsta = () => {
    try {
      toast.success('Insta logat cu succes');
    } catch (error) {
      toast.error(error);
    }
  };

  const logInToTikTok = () => {
    try {
      toast.success('Tiktok logat cu succes');
    } catch (error) {
      toast.error(error);
    }
  };

  const logInToLinkedin = () => {
    try {
      toast.success('Linkedin logat cu succes');
    } catch (error) {
      toast.error(error);
    }
  };

  const logInToYoutube = () => {
    try {
      toast.success('Youtube logat cu succes');
    } catch (error) {
      toast.error(error);
    }
  };

  const logInToPint = () => {
    try {
      toast.success('Pinterest logat cu succes');
    } catch (error) {
      toast.error(error);
    }
  };
  // logout of facebook
  const logOutOfFB = React.useCallback(() => {
    window.FB.logout(() => {
      setFbUserAccessToken(null);
    });
  }, []);

  // // Fetches an access token for the pages
  useEffect(() => {
    if (fbUserAccessToken) {
      try {
        window.FB.api('/me', async (response) => {
          setPageToken(response.id);
          await axios.put(
            'http://localhost:5000/api/facebook/addAccessToken',
            { pageToken },
            { headers: { authorization: `Bearer ${userInfo.token}` } }
          ); //userid for access
        });
        // console.log('Page Token:');
        // console.log(pageToken);
      } catch (error) {
        toast.error(`Sa ma bata mama: ${error}`);
      }
    }
  }, [fbUserAccessToken, pageToken, userInfo.token]);

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
        <Heading as={'h2'} textAlign={'center'}>
          Conectează conturile pe care dorești să le gestionezi
        </Heading>
        <HStack
          w={'full'}
          gap={'2rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          {fbUserAccessToken ? (
            <Box
              w={'fit-content'}
              bg={'facebook.500'}
              borderRadius={'1rem'}
              color={'#fff'}
              fontWeight={'bold'}
              p={'1rem 1.5rem'}
              onClick={logOutOfFB}
            >
              Deconectare Facebook
            </Box>
          ) : (
            <Button
              w={'250px'}
              h={'50px'}
              onClick={logInToFB}
              _hover={{ bg: 'facebook.700' }}
              _active={'none'}
              bg={'facebook.500'}
              color={'#fff'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              // disabled={userInfo.facebookData}
            >
              <Icon as={FaFacebook} fontSize={'1.5rem'} />
              &nbsp; Login with Facebook
            </Button>
          )}

          <Button
            w={'250px'}
            h={'50px'}
            onClick={logInToInsta}
            _hover={{ bg: '#a0214b' }}
            _active={'none'}
            bg={'#E1306C'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // disabled={userInfo.instagramData}
          >
            <Icon as={FaInstagram} fontSize={'1.5rem'} />
            &nbsp;Login with Instagram
          </Button>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={logInToPint}
            _hover={{ bg: '#b1001b' }}
            _active={'none'}
            bg={'#E60023'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // disabled={userInfo.twitterData}
          >
            <Icon as={FaPinterestP} fontSize={'1.5rem'} />
            &nbsp;Login with Pinterest
          </Button>
        </HStack>
        <Divider borderWidth={'medium'} borderColor={'#000'} />
        <HStack
          w={'full'}
          gap={'2rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Link href={'https://api.autopost.ro/api/tiktok/oauth'}>
            <Button
              w={'250px'}
              h={'50px'}
              onClick={logInToTikTok}
              _hover={{ bg: '#383838' }}
              _active={'none'}
              bg={'#000'}
              color={'#fff'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              // disabled={userInfo.tiktokData}
            >
              <Icon as={FaTiktok} fontSize={'1.5rem'} />
              &nbsp;Login with Tiktok
            </Button>
          </Link>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={logInToLinkedin}
            _hover={{ bg: 'linkedin.700' }}
            _active={'none'}
            bg={'linkedin.500'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // disabled={userInfo.linkedinData}
          >
            <Icon as={FaLinkedinIn} fontSize={'1.5rem'} />
            &nbsp;Login with LinkedIn
          </Button>
          <Button
            w={'250px'}
            h={'50px'}
            onClick={logInToYoutube}
            _hover={{ bg: 'red.700' }}
            _active={'none'}
            bg={'red.500'}
            color={'#fff'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // disabled={userInfo.youtubeData}
          >
            <Icon as={FaYoutube} fontSize={'1.5rem'} />
            &nbsp;Login with Youtube
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Home;
