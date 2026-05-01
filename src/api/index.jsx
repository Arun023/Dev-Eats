import axios from 'axios';
import { useEffect, useState } from 'react';
import { authSelector } from '../store/selectors';
import { useSelector } from 'react-redux';

export const useFetchRestaurant = (props) => {
  const [data, setData] = useState([]);
  const [actualData, setActualData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const GetResturants = async ({ lat, lng }) => {
    setFetch(true);
    const data = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat ? lat : '26.263863'
      }&lng=${lng ? lng : '73.008957'
      }&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    // const data = await axios.get(config.fetch_url);
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

export const useFetchMenu = (id) => {
  const [menu, setMenu] = useState(null);
  const currentLocation = useSelector(authSelector);
  const { latitude, longitude } = currentLocation || {};
  const GetRestaurantDetails = async ({ lat, lang, id }) => {
    const data = await axios.get(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lang}&restaurantId=${id}`
    );
    console.log('custom logger [data]', data);
    setMenu(data?.data);
  };
  useEffect(() => {
    const err = [undefined, 'undefined', '', false, null, 'null'];
    if (!err.includes(latitude) && !err.includes(longitude)) {
      GetRestaurantDetails({ lat: latitude, lang: longitude, id });
    } else {
      GetRestaurantDetails({ lat: '26.263863', lang: '73.008957', id });
    }
  }, []);

  console.log('custom logger []');

  return menu;
};
