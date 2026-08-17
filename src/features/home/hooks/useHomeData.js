import { useMemo } from "react";

/**
 * Custom hook to efficiently process home page data.
 * Utilizes pre-normalized data directly from Dev-Eats Backend when available,
 * with resilient fallback extraction if raw card array is supplied.
 */
export const useHomeData = (swiggyData, actualData) => {
  return useMemo(() => {
    // 1. Prefer pre-normalized data from Dev-Eats Backend
    if (actualData && (actualData.sliderFoodData || actualData.restaurantOnline)) {
      return {
        swiggyNotPresent:
          actualData?.communication?.swiggyNotPresent?.swiggyNotPresent,
        sliderTitle: actualData.sliderTitle || "",
        sliderFoodData: actualData.sliderFoodData || null,
        chainTitle: actualData.chainTitle || "",
        restaurantChain: actualData.restaurantChain || null,
        onlineTitle: actualData.onlineTitle || "",
        activeFilters: actualData.activeFilters || [],
        restaurantOnline: actualData.restaurantOnline || null,
      };
    }

    if (!Array.isArray(swiggyData) || swiggyData.length === 0) {
      return {
        swiggyNotPresent:
          actualData?.communication?.swiggyNotPresent?.swiggyNotPresent,
        sliderTitle: "",
        sliderFoodData: null,
        chainTitle: "",
        restaurantChain: null,
        onlineTitle: "",
        activeFilters: [],
        restaurantOnline: null,
      };
    }

    // 2. Fallback client extraction if raw array is passed
    const foodSliderCard =
      swiggyData.find(
        (c) =>
          c?.card?.card?.id === "whats_on_your_mind" ||
          c?.card?.card?.["@type"]?.includes("whats_on_your_mind") ||
          c?.card?.card?.gridElements?.infoWithStyle?.info ||
          c?.card?.card?.imageGridCards?.info
      ) || swiggyData[0];

    const sliderTitle = foodSliderCard?.card?.card?.header?.title || "";
    const sliderFoodData =
      foodSliderCard?.card?.card?.gridElements?.infoWithStyle?.info ||
      foodSliderCard?.card?.card?.imageGridCards?.info ||
      null;

    const restaurantChainCard =
      swiggyData.find(
        (c) =>
          c?.card?.card?.id === "top_brands_for_you" ||
          c?.card?.card?.header?.title
            ?.toLowerCase()
            ?.includes("top restaurant") ||
          (c?.card?.card?.gridElements?.infoWithStyle?.restaurants &&
            c !== foodSliderCard)
      ) || swiggyData[1];

    const chainTitle = restaurantChainCard?.card?.card?.header?.title || "";
    const restaurantChain =
      restaurantChainCard?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || null;

    const onlineTitleCard =
      swiggyData.find(
        (c) =>
          c?.card?.card?.id === "popular_restaurants_title" ||
          (c?.card?.card?.title &&
            typeof c?.card?.card?.title === "string" &&
            c?.card?.card?.title.toLowerCase().includes("online"))
      ) || swiggyData[2];

    const onlineTitle =
      onlineTitleCard?.card?.card?.title ||
      onlineTitleCard?.card?.card?.header?.title ||
      "";

    const filterCard =
      swiggyData.find(
        (c) =>
          c?.card?.card?.facetList ||
          c?.card?.card?.id?.includes("filter")
      ) || swiggyData[3];

    const rawFacetList = filterCard?.card?.card?.facetList || [];
    const restaurantFilterOuter = rawFacetList.filter(
      (data) => data?.id !== "catalog_cuisines"
    );

    const activeFilters = restaurantFilterOuter.flatMap((ele) =>
      (ele?.facetInfo || [])
        .filter((data) => data?.openFilter && data?.label)
        .map((data, idx) => ({
          id: data?.id || `${ele?.id || "facet"}-${data?.label}-${idx}`,
          label: data?.label,
        }))
    );

    const restaurantOnlineCard =
      swiggyData.find(
        (c) =>
          c?.card?.card?.id === "restaurant_grid_listing" ||
          c?.card?.card?.id === "restaurant_grid_listing_v2" ||
          c?.card?.card?.id?.includes("restaurant_grid") ||
          c?.card?.card?.["@type"]?.includes("ListingWidget") ||
          (c?.card?.card?.gridElements?.infoWithStyle?.restaurants &&
            c !== restaurantChainCard &&
            c !== foodSliderCard)
      ) || swiggyData[4];

    const restaurantOnline =
      restaurantOnlineCard?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || null;

    const swiggyNotPresent =
      actualData?.communication?.swiggyNotPresent?.swiggyNotPresent;

    return {
      swiggyNotPresent,
      sliderTitle,
      sliderFoodData,
      chainTitle,
      restaurantChain,
      onlineTitle,
      activeFilters,
      restaurantOnline,
    };
  }, [swiggyData, actualData]);
};
