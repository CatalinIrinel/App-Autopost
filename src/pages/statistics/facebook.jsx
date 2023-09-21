import { Box, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
// import { Line } from 'react-chartjs-2';
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
// import { Store } from '../../contexts/ContextProvider';
// import { toast } from 'react-toastify';

const Facebook = () => {
  // const [pageEngage, setPageEngage] = useState([{ text: '', data: [] }]);
  // const { state } = useContext(Store);
  // const { fbUserId } = state;
  // const [pages, setPages] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // const [pageEngageOptions, setPageEngageOptions] = useState([
  //   {
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'bottom',
  //         },
  //         title: {
  //           display: true,
  //           text: '',
  //         },
  //       },
  //     },
  //     data: {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: 'Engage',
  //           data: [],
  //           borderColor: '#3182ce',
  //           backgroundColor: '#b80000',
  //         },
  //       ],
  //     },
  //   },
  // ]);

  // const metricsList = [
  //   'page_views_logged_in_unique',
  //   'page_views_total',
  //   'page_posts_impressions_unique*',
  //   'page_posts_impressions_paid_unique*',
  //   'page_posts_impressions_organic*',
  //   'page_posts_impressions_organic_unique*',
  //   'page_engaged_users',
  //   'page_post_engagements*',
  //   'page_consumptions_unique',
  //   'page_total_actions',
  //   'post_reactions_by_type_total',
  //   'page_fans',
  //   'page_fan_adds_unique',
  // ];

  //Fetches users fb pages
  // useEffect(() => {
  //   if (fbUserId) {
  //     window.FB.api(`/${fbUserId}/accounts`, (response) => {
  //       if (response && !response.error) {
  //         setPages(response.data);
  //       }
  //     });
  //   }
  // }, [fbUserId]);

  // useEffect(() => {
  //   if (pages) {
  //     pages.forEach((page) =>
  //       window.FB.api(
  //         `/${page.id}/insights/page_engaged_users`,
  //         {
  //           access_token: page.access_token,
  //           date_preset: 'last_30d',
  //           period: 'month',
  //         },
  //         (response) => {
  //           setPageEngageOptions({
  //             ...pageEngageOptions,
  //             text: page.name,
  //             labels: [
  //               response.data[0].values.map(
  //                 (label) => label.end_time.split('T')[0]
  //               ),
  //             ],
  //             data: [response.data[0].values.map((value) => value.value)],
  //           });
  //           console.log(`Succes for page ${page.name}`);
  //         }
  //       )
  //     );
  //   } else {
  //     toast.error('Contul nu detine pagini pe care le poate gestiona');
  //   }
  // }, [pageEngageOptions, pages]);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'bottom',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Tineret Forta Dreptei Constanta',
  //     },
  //   },
  // };

  // const labels = pageEngage.map((engage) => {
  //   return engage.end_time.split('T')[0];
  // });

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Engage',
  //       data: pageEngage.map((engage) => engage.value),
  //       borderColor: '#3182ce',
  //       backgroundColor: '#3182ce',
  //     },
  //   ],
  // };

  // Console log area
  // console.table(pages);
  // console.log(pageEngageOptions);
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      w={'full'}
      minH={'100vh'}
    >
      <Heading as={'h1'}> Statistici Facebook</Heading>
      <Stack w={'full'} maxW={'100rem'} gap={'2rem'}>
        <Box w={'700px'} h={'700px'}>
          {/* {pageEngageOptions.map((graph) => (
            <Line options={graph.options} data={graph.data} />
          ))} */}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Facebook;
