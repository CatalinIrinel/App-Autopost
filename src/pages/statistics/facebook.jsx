import { Heading, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Store } from '../../contexts/ContextProvider';

const Facebook = () => {
  // const [pageEngage, setPageEngage] = useState([]);
  const { state } = useContext(Store);
  const { fbUserId } = state;
  const [pages, setPages] = useState([]);
  const [dateInterval, setDateInterval] = useState([]);

  const metricsList = [
    'page_views_logged_in_unique',
    'page_views_total',
    'page_posts_impressions_unique*',
    'page_posts_impressions_paid_unique*',
    'page_posts_impressions_organic*',
    'page_posts_impressions_organic_unique*',
    'page_engaged_users',
    'page_post_engagements*',
    'page_consumptions_unique',
    'page_total_actions',
    'post_reactions_by_type_total',
    'page_fans',
    'page_fan_adds_unique',
  ];

  //Fetches users fb pages, profile picture and user groups
  useEffect(() => {
    if (fbUserId) {
      window.FB.api(`/${fbUserId}/accounts`, (response) => {
        if (response && !response.error) {
          setPages(response.data);
        }
      });
    }
  }, [fbUserId]);

  useEffect(() => {
    if (pages) {
      pages.forEach((page) => {
        window.FB.api(
          `/${page.id}/insights/page_engaged_users`,
          {
            access_token: page.access_token,
            date_preset: 'last_30d',
            period: 'month',
          },
          (response) => {
            // setPageEngage([...pageEngage, response.data]);
            console.log('Page info');
            console.log(page);
            console.log('engaged users response');
            console.log(response.data);
          }
        );
      });
    }
  });

  // console.log('Page engages');
  // console.log(pageEngage);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Facebook',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(
          () =>
            Math.floor(Math.random() * (Math.floor(4586) - Math.ceil(0) + 1)) +
            Math.ceil(0)
        ),
        borderColor: '#3182ce',
        backgroundColor: '#1b1b1b',
      },
    ],
  };
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      w={'full'}
      minH={'100vh'}
    >
      <Heading as={'h1'}> Facebook area </Heading>
      <Stack>
        {/* {pageEngage.map((engage) => (
          <Line options={options} data={data} />
        ))} */}

        <Line options={options} data={data} />
      </Stack>
    </Stack>
  );
};

export default Facebook;
