import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../contexts/ContextProvider';
import { getError } from '../Utils';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      // window.location.href = 'https://app.autopost.ro/';
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     window.location.href = 'https://app.autopost.ro/';
  //   }
  // }, [userInfo]);
  return (
    <Flex
      w={'full'}
      flexDir={'column'}
      gap={'4rem'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box display="flex" justifyContent="center" w="100%" fontSize="2.5rem">
        <Heading as="h1">Loghează-te</Heading>
      </Box>
      <form onSubmit={submitHandler}>
        <FormControl isRequired mb="2rem">
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            borderColor={'#000'}
            w="300px"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb="2rem">
          <FormLabel htmlFor="password">Parola:</FormLabel>
          <Input
            borderColor={'#000'}
            w="300px"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Box display="flex" justifyContent="center" w="100%">
          <Button type="submit" bg="brand">
            Logare
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          Client Nou?&nbsp;
          <Link className="links" to={`/inregistrare?`}>
            Crează-ți contul aici!
          </Link>
        </Box>
      </form>
    </Flex>
  );
};

export default LoginPage;
