import React, { useRef, useState, useEffect } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import RestaurantCard from './RestaurantCard';
const ResturantSlider = ({ slider }) => {
  const slidesContainerRef = useRef(null);
  const slideRef = useRef(null);
  const [slideWidths, setSlideWidth] = useState(0);
  //   const NewlyOpenRestaurant = isVegRestaurant(RestaurantCard);

  const handleNextClick = () => {
    if (slidesContainerRef.current) {
      slidesContainerRef.current.scrollLeft += slideWidths + 300;
    }
  };
  const handlePrevClick = () => {
    if (slidesContainerRef.current) {
      slidesContainerRef.current.scrollLeft -= slideWidths + 300;
    }
  };

  useEffect(() => {
    const updateSlideWidth = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.clientWidth);
      }
    };
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  });
  //   console.log(slider);
  console.log('custom logger [slider]', slider);
  return (
    <>
      <div className="flex items-end justify-end gap-4">
        <div className="bg-gray-300 rounded-full py-3 px-3">
          <SlArrowLeft
            onClick={handlePrevClick}
            size={20}
            className={`cursor-pointer`}
          />
        </div>
        <div className="bg-gray-300 rounded-full py-3 px-3 ">
          <SlArrowRight
            onClick={handleNextClick}
            size={20}
            className="cursor-pointer "
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start mb-10 mt-4 relative ">
        <div
          ref={slidesContainerRef}
          className="slides-container flex overflow-hidden space-x-2 rounded scroll-smooth w-full">
          {slider?.map((data) => {
            return (
              <div
                key={data?.info?.id}
                ref={slideRef}
                className={`w-96 object-cover slide flex-shrink-0 snap-center rounded overflow-hidden `}>
                <RestaurantCard data={{ ...data.info }} key={data?.info?.id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResturantSlider;
