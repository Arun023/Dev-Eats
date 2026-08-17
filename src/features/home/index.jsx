import { useSelector } from "react-redux";
import { useFetchRestaurant } from "../../api";
import FoodSlider from "./components/FoodSlider";
import { authSelector } from "../../store/selectors";
import ResturantSlider from "./components/RestaurantSlider";
import RestaurantCard from "./components/RestaurantCard";
import { useHomeData } from "./hooks/useHomeData";

const HomeView = () => {
  const currentLocation = useSelector(authSelector);
  const { latitude, longitude } = currentLocation || {};
  const {
    data: SwiggyData,
    actualData,
    fetch: isLoading,
  } = useFetchRestaurant({
    latitude,
    longitude,
  });

  const {
    sliderTitle,
    sliderFoodData,
    chainTitle,
    restaurantChain,
    onlineTitle,
    activeFilters,
    restaurantOnline,
  } = useHomeData(SwiggyData, actualData);

  return (
    <div className="w-full max-w-[84%] mx-auto px-2 sm:px-4 py-4">
      {/* 1. Food Slider ("What's on your mind?") */}
      <FoodSlider
        style="w-36 h-36"
        slider={sliderFoodData}
        title={sliderTitle}
      />

      <hr className="my-8 border-gray-200" />

      {/* 2. Top Restaurant Chains Slider */}
      <ResturantSlider slider={restaurantChain} title={chainTitle} />

      <hr className="my-8 border-gray-200" />

      {/* 3. Online Restaurants Title */}
      {onlineTitle && (
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight my-5">
          {onlineTitle}
        </h2>
      )}

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="text-sm text-gray-700 font-medium mb-6 flex items-center flex-wrap gap-3">
          {activeFilters.map((filter) => (
            <button
              key={filter.id}
              className="px-4 py-1.5 border border-gray-300 hover:border-gray-400 rounded-full bg-white text-gray-700 transition-colors shadow-sm cursor-pointer"
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* 4. Online Restaurants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurantOnline?.map((res) => (
          <div key={res.info.id} className="w-full justify-center">
            <RestaurantCard data={{ ...res.info }} />
          </div>
        ))}

        {restaurantOnline?.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-10 text-gray-500 font-medium text-lg">
            No Restaurants Found
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
