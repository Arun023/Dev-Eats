import { useSelector } from 'react-redux';
import { useFetchRestaurant } from '../../api';
import FoodSlider from './components/FoodSlider';
import { authSelector } from '../../store/selectors';
import ResturantSlider from './components/RestaurantSlider';
import RestaurantCard from './components/RestaurantCard';

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

  const restaurantFilter = SwiggyData[3]?.card?.card;
  const restaurantFilterOuter = restaurantFilter?.facetList?.filter(
    (data) => data?.id !== 'catalog_cuisines'
  );

  const RestaurantOnline =
    SwiggyData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  console.log(
    'custom logger [RestaurantChain]',
    RestaurantChain,
    swiggyNotPresent
  );

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
      <div className="text-2xl font-bold mt-5 mb-5">
        {SwiggyData?.[2]?.card?.card?.title}
      </div>
      <div className="text-base text-gray-700 font-medium mb-5 flex items-center flex-wrap gap-5">
        {restaurantFilterOuter?.map((ele) => {
          return ele?.facetInfo?.map((data, idx) => {
            return (
              data.openFilter && (
                <span
                  key={idx}
                  className="px-3 border py-1 border-gray-300 rounded-full">
                  {data?.label}
                </span>
              )
            );
          });
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-5">
        {RestaurantOnline?.map((res) => {
          return (
            <div key={res.info.id}>
              <RestaurantCard data={{ ...res.info }} />
            </div>
          );
        })}
        {/* <Sl ider slider={RestaurantChain} style={`w-32 h-32`} /> */}
        {RestaurantOnline?.length === 0 && <h2>No Restaurant Found</h2>}
      </div>
    </div>
  );
};
export default HomeView;
