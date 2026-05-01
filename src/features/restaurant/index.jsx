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

  console.log('restData', { restData, OfferData, categories });

  if (!Data) return <div>Loading.</div>;
  if (!OfferData) return <div>Loading..</div>;
  if (!categories) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl px-md-0 px-10 mx-auto my-20 flex flex-col gap-5">
      {Data !== undefined && (
        <>
          <div ref={scroll} className="flex justify-between flex-wrap">
            <div>
              <div className="text-sm md:text-xl font-bold text-gray-700">
                {Data?.info?.name}
              </div>
              <div className="flex text-sm md:text-[15px] text-gray-500">
                {Data?.info?.cuisines?.join(', ')}
              </div>
              <div className="flex gap-2 text-sm md:text-[15px] text-gray-500">
                <div>{Data?.info?.areaName},</div>
                <div>{Data?.info?.sla.lastMileTravelString}</div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl flex flex-col justify-between px-3 py-2">
              <div className="text-green-700 flex gap-1 items-center font-bold tracking-tighter">
                <IoStar size={18} /> {Data?.info?.avgRatingString}
              </div>
              <div className="text-xs border-gray-200 border-t pt-2 text-gray-500 font-bold tracking-tighter">
                {Data?.info?.totalRatingsString}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-7 border-t border-t-slate-300 border-dashed pt-5">
            <div className="text-gray-600 flex items-center gap-3 font-bold">
              <MdAccessTimeFilled size={26} />
              <span className="text-[17px] leading-4 ">
                {Data?.info?.sla?.slaString}
              </span>
            </div>
            <div className="text-gray-600 flex items-center gap-3 font-bold">
              <HiOutlineCurrencyRupee size={26} />
              <span className="text-[17px] leading-4 ">
                {Data?.info?.costForTwoMessage}
              </span>
            </div>
          </div>
        </>
      )}
      <div className="text-xl font-bold">Deals for you</div>

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
