import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchRestaurant = (props) => {
  const [data, setData] = useState([]);
  const [actualData, setActualData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const GetResturants = async ({ lat, lng }) => {
    setFetch(true);
    const data = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${
        lat ? lat : '26.263863'
      }&lng=${
        lng ? lng : '73.008957'
      }&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    setActualData(data?.data?.data);
    setData(data?.data?.data?.cards);
    setFetch(false);
  };

  console.log('custom logger [props]', props?.latitude);

  useEffect(() => {
    GetResturants({ lat: props?.latitude, lng: props?.longitude });
  }, [props?.latitude, props?.longitude]);

  return { data, fetch, actualData };
};
