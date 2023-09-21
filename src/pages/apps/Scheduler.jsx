import { Button, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { toast } from 'react-toastify';

const Scheduler = () => {
  const [postText, setPostText] = useState('');
  const [postImages, setPostImages] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postLink, setPostLink] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  const schedulePost = React.useCallback(() => {
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
            published: false,
            scheduled_publish_time: schedulePost,
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
            published: false,
            scheduled_publish_time: schedulePost,
          },
          () => {
            setPostText('');
            setIsPublishing(false);
          }
        )
      );
    }
    setPostImage('');
    toast.success('Postarea a fost programata cu succes');
  }, [postImage, postLink, postText, selectedPages]);
  return (
    <Stack maxW={'90rem'} w={'full'} h={'100vh'}>
      <Heading as={'h1'}> Calendar </Heading>
      <HStack w={'full'}>
        <Button
          w={'fit-content'}
          onClick={schedulePost}
          isDisabled={
            !postText ||
            isPublishing ||
            selectedPages.length === 0 ||
            selectedGroups.length > 0
          }
        >
          Programează pe pagini
        </Button>
      </HStack>
      <Stack w={'full'}>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </Stack>
    </Stack>
  );
};

export default Scheduler;
