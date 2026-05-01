import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MdAccessTimeFilled } from 'react-icons/md';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { IoStar } from 'react-icons/io5';
import { config } from '../../config/config';
import { useFetchMenu } from '../../api';
import RestaurantCategory from './components/RestaurantCategory';
import OfferSlider from './components/OfferSlider';
// import Shimmer from "./shimmer/Shimmer";
const RestaurantView = () => {
  const scroll = useRef(null);
  const [currentIndex, setCurrentIndex] = useState('');
  const { id } = useParams();
  const restData = useFetchMenu(id);
  const Data = restData?.data?.cards?.[2]?.card?.card;
  const OfferData = restData?.data?.cards?.[3]?.card?.card;
  const groupedCards =
    restData?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = groupedCards?.filter(
    (ele) =>
      ele.card.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory' ||
      ele.card.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory'
  );
  console.log('[groupedCards]', restData?.data);

  useEffect(() => {
    const scrollToBottom = () => {
      scroll.current.scrollIntoView({
        behavior: 'smooth',
        postion: 'top',
      });
    };
    if (scroll.current) {
      scrollToBottom();
    }
  }, [scroll]);


  if (!Data) return <div>Loading.</div>;
  if (!OfferData) return <div>Loading..</div>;
  if (!categories) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl px-md-0 px-10 mx-auto my-20 flex flex-col gap-5">
      {Data !== undefined && (
        <>
          {/* Restaurant Header — Swiggy-style */}
          <div ref={scroll}>
            {/* Restaurant Name */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              {Data?.info?.name}
            </h1>

            {/* Info card */}
            <div className='border-2 border-[#E6E6ED] bg-gradient-to-b from-white via-[#ebebf2] to-[#dfdfe7] rounded-2xl px-5 py-5 rounded-b-[36px]'>
              <div className="bg-white px-5 py-5 rounded-b-[36px]">
                {/* Rating · Cuisines · Cost for two */}
                <div className="flex flex-wrap items-center gap-1 text-sm font-semibold text-gray-800 mb-2">
                  <span className="flex items-center gap-1 text-green-600 font-bold">
                    <IoStar size={16} />
                    {Data?.info?.avgRatingString}
                  </span>
                  <span className="text-gray-400 mx-1">·</span>
                  <span className="text-gray-500 font-normal text-xs">
                    ({Data?.info?.totalRatingsString})
                  </span>
                  <span className="text-gray-400 mx-1">·</span>
                  <div className="flex items-center gap-1 text-gray-700">
                    <HiOutlineCurrencyRupee size={15} />
                    <span>{Data?.info?.costForTwoMessage}</span>
                  </div>
                </div>

                {/* Cuisines */}
                <div className="text-sm text-orange-500 font-semibold mb-3 cursor-pointer hover:underline">
                  {Data?.info?.cuisines?.join(', ')}
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col gap-2">
                  {/* Outlet / Area */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                    <span className="font-semibold tracking-tight text-black">Outlet</span>
                    <span>{Data?.info?.areaName}</span>
                    <span className="text-gray-400">·</span>
                    <span>{Data?.info?.sla?.lastMileTravelString}</span>
                  </div>

                  {/* Delivery time */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MdAccessTimeFilled size={16} className="text-gray-400" />
                    <span className="font-semibold text-black tracking-tight">
                      {Data?.info?.sla?.slaString}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <OfferSlider offers={OfferData?.gridElements?.infoWithStyle?.offers} />
      {categories?.map((ele) => {
        return (
          <RestaurantCategory
            {...ele?.card?.card}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            key={ele?.card?.card?.title}
            restaurant={Data}
          />
        );
      })}
    </div>
  );
};

export default RestaurantView;
