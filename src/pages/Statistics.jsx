import { Box, Icon, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
const Statistics = () => {
  return (
    <Flex w={'full'} h={'100vh'}>
      <Heading as={'h1'}> Statistics area </Heading>
      <Stack w={'full'} maxW={'90rem'} gap={'3rem'} pb={'2rem'} color={''}>
        {[
          { title: 'facebook', icon: FaFacebook, color: 'facebook.500' },
          { title: 'instagram', icon: FaInstagram, color: '#E1306C' },
          { title: 'twitter', icon: FaTwitter, color: 'twitter.500' },
          { title: 'tiktok', icon: FaTiktok, color: 'black' },
          { title: 'youtube', icon: FaYoutube, color: 'red.500' },
        ].map((item) => (
          <Stack>
            <Heading
              display={'flex'}
              alignItems={'center'}
              gap={'1rem'}
              as={'h2'}
              textTransform={'capitalize'}
            >
              <Icon color={item.color} as={item.icon} />
              {item.title}
            </Heading>
            <HStack gap={'2rem'}>
              <Box
                border={'1px solid #3383bc'}
                borderRadius={'1rem'}
                p={'1rem 1.25rem'}
                boxShadow={'0 7px 1rem rgba(0,0,0,0.3)'}
                w={{ base: '300px', md: '400px' }}
                h={{ base: '200px', md: '250px' }}
              >
                {' '}
                statistic area 1
              </Box>
              <Box
                border={'1px solid #3383bc'}
                borderRadius={'1rem'}
                p={'1rem 1.25rem'}
                boxShadow={'0 7px 1rem rgba(0,0,0,0.3)'}
                w={{ base: '300px', md: '400px' }}
                h={{ base: '200px', md: '250px' }}
              >
                {' '}
                statistic area 2
              </Box>
              <Box
                border={'1px solid #3383bc'}
                borderRadius={'1rem'}
                p={'1rem 1.25rem'}
                boxShadow={'0 7px 1rem rgba(0,0,0,0.3)'}
                w={{ base: '300px', md: '400px' }}
                h={{ base: '200px', md: '250px' }}
              >
                {' '}
                statistic area 3
              </Box>
            </HStack>
          </Stack>
        ))}
      </Stack>
    </Flex>
  );
};

export default Statistics;
