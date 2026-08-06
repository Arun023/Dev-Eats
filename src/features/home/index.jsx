import { useSelector } from "react-redux";
import { useFetchRestaurant } from "../../api";
import FoodSlider from "./components/FoodSlider";
import { authSelector } from "../../store/selectors";
import ResturantSlider from "./components/RestaurantSlider";
import RestaurantCard from "./components/RestaurantCard";
import { useHomeData } from "./hooks/useHomeData";

// const swiggyNotPresent =
//   actualData?.communication?.swiggyNotPresent?.swiggyNotPresent;

// const RestaurantChain =
//   SwiggyData?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

// const sliderTitle = SwiggyData?.[0]?.card.card?.header?.title;
// const sliderFoodData =
//   SwiggyData?.[0]?.card.card?.gridElements?.infoWithStyle.info;

// const restaurantFilter = SwiggyData[3]?.card?.card;
// const restaurantFilterOuter = restaurantFilter?.facetList?.filter(
//   (data) => data?.id !== "catalog_cuisines",
// );

// const RestaurantOnline =
//   SwiggyData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

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

  console.log("custom logger [  SwiggyData, actualData,]", {
    SwiggyData,
    actualData,
  });

  return (
    <div className="px-20">
      <FoodSlider
        style="w-full h-60"
        slider={sliderFoodData}
        title={sliderTitle}
      />
      {chainTitle && (
        <div className="text-2xl font-bold px-5 my-5">{chainTitle}</div>
      )}
      <ResturantSlider slider={restaurantChain} />
      {onlineTitle && (
        <div className="text-2xl font-bold mt-5 mb-5">{onlineTitle}</div>
      )}
      {activeFilters.length > 0 && (
        <div className="text-base text-gray-700 font-medium mb-5 flex items-center flex-wrap gap-5">
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className="px-3 border py-1 border-gray-300 rounded-full"
            >
              {filter.label}
            </span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-5">
        {restaurantOnline?.map((res) => (
          <div key={res.info.id}>
            <RestaurantCard data={{ ...res.info }} />
          </div>
        ))}
        {restaurantOnline?.length === 0 && !isLoading && (
          <h2>No Restaurant Found</h2>
        )}
      </div>
    </div>
  );
};

export default HomeView;
