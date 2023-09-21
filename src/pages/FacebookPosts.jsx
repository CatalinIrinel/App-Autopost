import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { getError } from '../Utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../contexts/ContextProvider';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

const FacebookPosts = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [pageToken, setPageToken] = useState('');

  const [{ error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  // posts data
  const [postText, setPostText] = useState('');
  const [postImages, setPostImages] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postLink, setPostLink] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  // user data
  const [name, setName] = useState('');
  const [userProfilePic, setUserProfilePic] = useState();
  const [userGroups, setUserGroups] = useState([]);

  // pages data
  const [pages, setPages] = useState([]);
  // const [pagesProfilePicture, setPagesProfilePicture] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  //pages group
  // const [pageGroups, setPageGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  useEffect(() => {
    const fetchToken = async () => {
      const result = await axios.get(
        'http://localhost:5000/api/facebook/getAccessToken',
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      setPageToken(result.data);
    };
    fetchToken();
  });

  //Fetches users fb pages, profile picture and user groups
  useEffect(() => {
    if (pageToken) {
      window.FB.api(`/${pageToken}/accounts`, (response) => {
        if (response && !response.error) {
          setPages(response.data);
        }
      });
      window.FB.api(
        `/${pageToken}/picture`,
        {
          redirect: false,
          type: 'small',
        },
        (response) => {
          if (response && !response.error) {
            setUserProfilePic(response.data.url);
          }
        }
      );
      window.FB.api(`/${pageToken}/groups`, (response) => {
        if (response && !response.error) {
          setUserGroups(response.data);
        }
      });
    }
  }, [pageToken]);

  // Publishes a post on the Facebook pages

  const sendPostToPage = React.useCallback(() => {
    setIsPublishing(true);

    if (postImage) {
      selectedPages.forEach((page) =>
        window.FB.api(
          `/${page.id}/photos`,
          'POST',
          {
            message: postText,
            access_token: page.access_token,
            url: postImage,
          },
          () => {
            setPostText('');
            setIsPublishing(false);
          }
        )
      );
    } else {
      selectedPages.forEach((page) =>
        window.FB.api(
          `/${page.id}/feed`,
          'POST',
          {
            message: postText,
            access_token: page.access_token,
            link: postLink || '',
          },
          () => {
            setPostText('');
            setIsPublishing(false);
          }
        )
      );
    }
    setPostImage('');
    toast.success('Postarea a fost creata cu succes');
  }, [postImage, selectedPages, postText, postLink]);

  // Publishes a post on the Facebook groups
  const sendPostToGroup = React.useCallback(async () => {
    setIsPublishing(true);

    if (postImage) {
      selectedGroups.forEach((group) =>
        window.FB.api(
          `/${group.id}/photos`,
          'POST',
          {
            message: postText,
            url: postImage,
          },
          () => {
            setPostText('');
            setIsPublishing(false);
          }
        )
      );
    } else {
      selectedGroups.forEach((group) =>
        window.FB.api(
          `/${group.id}/feed`,
          'POST',
          {
            message: postText,
            link: postLink || '',
          },
          () => {
            setPostText('');
            setIsPublishing(false);
          }
        )
      );
    }
    setPostImage('');
    toast.success('Postarea a fost creata cu succes');
  }, [postImage, postLink, postText, selectedGroups]);

  // const Link = 'https://api.autopost.ro';

  // Cloud Side Upload

  const uploadCloudHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        'http://localhost:5000/api/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setPostImages([...postImages, data.secure_url]);
      } else {
        setPostImage(data.secure_url);
      }
      toast.success('Pozele au fost urcate cu succes.');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const addAllPages = () => {
    if (selectedPages.length !== 50) {
      setSelectedPages(pages);
    } else {
      toast.info('Poti selecta maxim 50 de pagini');
    }
  };

  const addAllGroups = () => {
    if (selectedGroups.length !== 50) {
      setSelectedGroups(pages);
    } else {
      toast.info('Poti selecta maxim 50 de grupuri');
    }
  };

  const deselectPage = (id) => {
    const newSelected = selectedPages.filter((item) => item.id !== id);
    setSelectedPages(newSelected);
  };
  const deselectGroup = (id) => {
    const newSelected = selectedGroups.filter((item) => item.id !== id);
    setSelectedGroups(newSelected);
  };

  const addPage = (page) => {
    const id = page.id;
    const duplicate = selectedPages.find((item) => item.id === id);
    if (selectedPages.length !== 50) {
      if (!duplicate) {
        setSelectedPages([...selectedPages, page]);
      } else {
        toast.error('Pagina este deja aleasa');
      }
    } else {
      toast.info('Poți selecta maxim 50 de pagini');
    }
  };

  const addGroup = (group) => {
    const id = group.id;
    const duplicate = selectedGroups.find((item) => item.id === id);
    if (selectedGroups.length !== 50) {
      if (!duplicate) {
        setSelectedGroups([...selectedGroups, group]);
      } else {
        toast.error('Grupul este deja aleas');
      }
    } else {
      toast.info('Poți selecta maxim 50 de grupuri');
    }
  };
  // Console log area
  // console.log(pages);
  return (
    <Stack
      w={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'5rem'}
    >
      <Heading as={'h1'} textAlign={'center'}>
        Posteaza pe Facebook
      </Heading>

      {!loadingUpdate && !error ? (
        <>
          <HStack alignItems={'flex-start'} gap={'5rem'}>
            <Stack>
              <Stack>
                <HStack alignItems={'flex-start'}>
                  <>
                    <Text>Bună, {name}</Text>
                    <Avatar src={userProfilePic} />
                  </>

                  <Divider orientation="vertical" />
                </HStack>

                <Accordion w={['500px']} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      Alege pe ce pagini să postezi <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack alignItems={'flex-start'}>
                        <Button
                          variant={'ghost'}
                          _hover={'none'}
                          _active={'none'}
                          onClick={addAllPages}
                        >
                          Selectează primele 50
                        </Button>
                        <Divider />
                        <Stack gap={'1rem'} alignItems={'flex-start'}>
                          {pages.map((page) => (
                            <Button
                              key={page.id}
                              variant={'ghost'}
                              onClick={() => {
                                addPage(page);
                              }}
                            >
                              <Avatar name={page.name} />
                              <Text>{page.name}</Text>
                            </Button>
                          ))}
                        </Stack>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                {selectedPages.length !== 0 && (
                  <HStack w={['500px']} flexWrap={'wrap'}>
                    {selectedPages.map((page) => (
                      <Stack key={page.id}>
                        {/* {pagesProfilePicture.map((profile) => (
                          <Avatar name={page.name} src={profile} />
                        ))} */}
                        <Text fontSize={'.8rem'} w={'20ch'}>
                          {page.name}
                        </Text>
                        <DeleteIcon
                          color={'facebook.500'}
                          onClick={() => deselectPage(page.id)}
                        />
                      </Stack>
                    ))}
                  </HStack>
                )}

                <>
                  <Accordion w={['500px']} allowMultiple>
                    <AccordionItem>
                      <AccordionButton>
                        Alege pe ce grupuri să postezi <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Stack alignItems={'flex-start'}>
                          <Button
                            variant={'ghost'}
                            _hover={'none'}
                            _active={'none'}
                            onClick={addAllGroups}
                          >
                            Selectează primele 50
                          </Button>
                          <Divider />
                          <Stack gap={'1rem'} alignItems={'flex-start'}>
                            {userGroups.map((page) => (
                              <Button
                                key={page.id}
                                variant={'ghost'}
                                onClick={() => {
                                  addGroup(page);
                                }}
                              >
                                <Avatar name={page.name} />
                                <Text>{page.name}</Text>
                              </Button>
                            ))}
                          </Stack>
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  {selectedGroups.length !== 0 && (
                    <HStack w={['500px']} flexWrap={'wrap'}>
                      {selectedGroups.map((page) => (
                        <Stack key={page.id}>
                          <Avatar src={page.picture} />

                          <DeleteIcon
                            color={'facebook.500'}
                            onClick={() => deselectGroup(page.id)}
                          />
                        </Stack>
                      ))}
                    </HStack>
                  )}
                </>

                <form>
                  <Stack>
                    <Textarea
                      value={postText}
                      placeholder={'Introdu textul pentru postare'}
                      rows={8}
                      disabled={isPublishing}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <FormControl>
                      <FormLabel>Adaugă o imagine:</FormLabel>
                      <Input
                        w={['300px', '500px']}
                        name={'file'}
                        accept={'image/*'}
                        type={'file'}
                        onChange={uploadCloudHandler}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Introdu link-ul:</FormLabel>
                      <Input
                        type={'text'}
                        w={['300px', '500px']}
                        value={postLink}
                        onChange={(e) => setPostLink(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                </form>
              </Stack>
              <HStack>
                <Button
                  w={'fit-content'}
                  onClick={sendPostToPage}
                  isDisabled={
                    !postText ||
                    isPublishing ||
                    selectedPages.length === 0 ||
                    selectedGroups.length > 0
                  }
                >
                  Postează pe pagini
                </Button>
              </HStack>
              <Button
                w={'fit-content'}
                onClick={sendPostToGroup}
                isDisabled={
                  !postText ||
                  isPublishing ||
                  selectedGroups.length === 0 ||
                  selectedPages.length > 0
                }
              >
                Postează pe grupuri
              </Button>
            </Stack>
            <Stack
              border={'1px solid rgba(202, 202, 202,0.8)'}
              gap={'1rem'}
              px={'3rem'}
              py={'2rem'}
              justifyContent={'center'}
              alignItems={'center'}
              w={{ base: '350px', md: '600px' }}
            >
              <HStack gap={'1rem'}>
                <Avatar size={'md'} name="Auto Post" />{' '}
                <Heading as={'h2'}>Denumirea paginii</Heading>
              </HStack>
              <Stack w={'full'}>
                <Text>{postText}</Text>
              </Stack>
              {postImage && (
                <Stack
                  w={{ base: '350px', md: '600px' }}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Image
                    w={{ base: '350px', md: '400px' }}
                    objectFit={'cover'}
                    src={`${postImage}`}
                    alt={'AutoPost - Facebook Post Image Preview'}
                  />
                </Stack>
              )}
            </Stack>
          </HStack>
        </>
      ) : null}
    </Stack>
  );
};

export default FacebookPosts;
