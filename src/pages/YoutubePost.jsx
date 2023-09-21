import { DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../contexts/ContextProvider';
import axios from 'axios';

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

const YoutubePost = () => {
  const { state } = useContext(Store);
  const { youtubeToken } = state;

  const [{ error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [userChannels, setUserChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState([]);

  //   states
  const [postText, setPostText] = useState('');
  const [videoThumbnail, setVideoThumb] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notifySubs, setNotifySubs] = useState(false);
  const [privacy, setPrivacy] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [language, setLanguage] = useState('');
  const [audio, setAudio] = useState('');

  const uploadVideo = () => {};
  const addChannel = () => {};
  const deselectChannel = () => {};
  const postYoutube = async () => {};
  return (
    <Stack
      w={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'5rem'}
    >
      <Heading as={'h1'} textAlign={'center'}>
        <Text color={'#3182ce'}>Auto</Text> Youtube
      </Heading>

      {!loadingUpdate && !error && youtubeToken ? (
        <>
          <Stack>
            <Stack>
              <>
                <Accordion w={['500px']} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      Alege pe ce canal să postezi <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack alignItems={'flex-start'}>
                        <Stack gap={'1rem'} alignItems={'flex-start'}>
                          {userChannels.map((page) => (
                            <Button
                              key={page.id}
                              variant={'ghost'}
                              onClick={() => {
                                addChannel(page);
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
                {selectedChannel.length !== 0 && (
                  <HStack w={['500px']} flexWrap={'wrap'}>
                    {selectedChannel.map((page) => (
                      <Stack key={page.id}>
                        <Avatar src={page.picture} />

                        <DeleteIcon
                          color={'facebook.500'}
                          onClick={() => deselectChannel(page.id)}
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
                    // disabled={isPublishing}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  <FormControl>
                    <FormLabel>Adaugă videoclipul:</FormLabel>
                    <Input
                      w={['300px', '500px']}
                      name={'file'}
                      accept={'image/*'}
                      type={'file'}
                      onChange={uploadVideo}
                    />
                  </FormControl>
                </Stack>
              </form>
            </Stack>
            <HStack>
              <Button
                w={'fit-content'}
                onClick={postYoutube}
                isDisabled={
                  !postText
                  // !postVideo ||
                  // isPublishing ||
                  // selectedChannel.length === 0
                }
              >
                Postează
              </Button>
            </HStack>
          </Stack>
        </>
      ) : null}
    </Stack>
  );
};

export default YoutubePost;
