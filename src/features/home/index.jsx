import { useSelector } from 'react-redux';
import { useFetchRestaurant } from '../../api';
import FoodSlider from './components/FoodSlider';
import { authSelector } from '../../store/selectors';
import ResturantSlider from './components/RestaurantSlider';

const HomeView = () => {
  const currentLocation = useSelector(authSelector);
  const { latitude, longitude } = currentLocation || {};
  const { data: SwiggyData, actualData } = useFetchRestaurant({
    latitude,
    longitude,
  });
  const swiggyNotPresent =
    actualData?.communication?.swiggyNotPresent?.swiggyNotPresent;

  const RestaurantChain =
    SwiggyData?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  const sliderTitle = SwiggyData?.[0]?.card.card?.header?.title;
  const sliderFoodData =
    SwiggyData?.[0]?.card.card?.gridElements?.infoWithStyle.info;

  console.log('custom logger [RestaurantChain]', RestaurantChain);

  return (
    <div className="px-20">
      <FoodSlider
        style={`w-full h-60`}
        slider={sliderFoodData}
        title={sliderTitle}
      />
      <div className="text-2xl font-bold px-5 my-5">
        {SwiggyData?.[1]?.card?.card?.header?.title}
      </div>
      <ResturantSlider slider={RestaurantChain} />
    </div>
  );
};
export default HomeView;
