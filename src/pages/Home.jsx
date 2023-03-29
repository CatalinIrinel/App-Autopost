import {
  Heading,
  HStack,
  Icon,
  Stack,
  Button,
  Divider,
  Box,
} from '@chakra-ui/react';
// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  FaFacebook,
  // FaTwitter,
  FaInstagram,
  // FaTiktok,
  // FaYoutube,
  // FaLinkedinIn,
} from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { Store } from '../contexts/ContextProvider';
import { useInitFbSDK } from '../hooks/fbHooks';

const Home = () => {
  // const { state } = useContext(Store);
  // const { userInfo } = state;

  // user data
  const [name, setName] = useState();
  const [userId, setUserId] = useState();
  // const [userProfilePic, setUserProfilePic] = useState();
  // const [userGroups, setUserGroups] = useState([]);

  // pages data
  // const [pages, setPages] = useState([]);
  // const [pagesProfilePicture, setPagesProfilePicture] = useState([]);
  // const [selectedPages, setSelectedPages] = useState([]);
  const [fbUserAccessToken, setFbUserAccessToken] = useState();

  const isFbSDKInitialized = useInitFbSDK();
  useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
    }
  }, [fbUserAccessToken, isFbSDKInitialized]);

  const logInToInsta = React.useCallback(() => {
    console.log('It works for insta');
  }, []);
  // login to fb
  const logInToFB = React.useCallback(() => {
    window.FB.login(
      (response) => {
        if (response.status === 'connected') {
          setFbUserAccessToken(response.authResponse.accessToken);
        } else {
          throw new Error();
        }
      },
      {
        scope:
          'pages_show_list, pages_manage_ads, pages_manage_posts, pages_manage_metadata, pages_manage_engagement, pages_read_engagement, public_profile, ads_management, publish_video, leads_retrieval,  publish_to_groups, instagram_basic, instagram_content_publish, instagram_manage_comments ',
      }
    );
  }, []);

  // logout of facebook
  const logOutOfFB = React.useCallback(() => {
    window.FB.logout(() => {
      setFbUserAccessToken(null);
      // setFbPageAccessToken(null);
      localStorage.removeItem('fbAccess');
      localStorage.removeItem('fbUserId');
      localStorage.removeItem('fbUserAccess');
    });
  }, []);

  // Checks if the user is logged in to Facebook
  useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
    }
  }, [fbUserAccessToken, isFbSDKInitialized]);

  // Fetches an access token for the pages
  useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api('/me', (response) => {
        setName(response.name);
        setUserId(response.id); //userid for access
      });
      localStorage.setItem('fbUserId', JSON.stringify(userId));
      localStorage.setItem('fbAccess', JSON.stringify(fbUserAccessToken));
    }
  }, [fbUserAccessToken, userId]);

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
          Conecteaza conturile pe care doresti sa le gestionezi
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
            &nbsp;Instagram Login
          </Button>
          {/* <Button
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
            // disabled={userInfo.twitterData}
          >
            <Icon as={FaTwitter} fontSize={'1.5rem'} />
            &nbsp;Twitter Login
          </Button> */}
        </HStack>
        <Divider borderWidth={'medium'} borderColor={'#000'} />
        {/* <HStack
          w={'full'}
          gap={'2rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexWrap={'wrap'}
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
            // disabled={userInfo.tiktokData}
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
            // disabled={userInfo.linkedinData}
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
            // disabled={userInfo.youtubeData}
          >
            <Icon as={FaYoutube} fontSize={'1.5rem'} />
            &nbsp;Youtube Login
          </Button>
        </HStack> */}
      </Stack>
    </Stack>
  );
};

export default Home;
