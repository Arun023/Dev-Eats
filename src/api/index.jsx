import axios from "axios";
import { useEffect, useState } from "react";
import { authSelector } from "../store/selectors";
import { useSelector } from "react-redux";
import { config } from "../config/config";

export const useFetchRestaurant = (props) => {
  const [data, setData] = useState([]);
  const [actualData, setActualData] = useState([]);
  const [fetch, setFetch] = useState(false);

  const GetResturants = async ({ lat, lng }) => {
    setFetch(true);
    try {
      const latitude = lat || "26.263863";
      const longitude = lng || "73.008957";
      const res = await axios.get(
        `${config.backend_url}/restaurants?lat=${latitude}&lng=${longitude}`
      );

      const payload = res?.data?.data;
      setActualData(payload || []);
      setData(payload?.cards || []);
    } catch (err) {
      console.error(
        "[API ERROR] Failed to fetch restaurants from backend:",
        err
      );
    } finally {
      setFetch(false);
    }
  };

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
    try {
      const res = await axios.get(
        `${config.backend_url}/restaurants/${id}/menu?lat=${lat}&lng=${lang}`
      );
      setMenu(res?.data?.data);
    } catch (err) {
      console.error(
        `[API ERROR] Failed to fetch menu for restaurant ${id}:`,
        err
      );
    }
  };

  useEffect(() => {
    const invalidVals = [undefined, "undefined", "", false, null, "null"];
    const lat = !invalidVals.includes(latitude) ? latitude : "26.263863";
    const lng = !invalidVals.includes(longitude) ? longitude : "73.008957";

    if (id) {
      GetRestaurantDetails({ lat, lang: lng, id });
    }
  }, [id, latitude, longitude]);

  return menu;
};
