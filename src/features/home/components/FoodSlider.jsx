import { useRef, useState, useEffect } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../components/ui/Skeleton';
import { config } from '../../../config/config';

const FoodSlider = ({ style, slider, title }) => {
  const scrollRef = useRef();
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsLeftDisabled(scrollLeft <= 0);
      setIsRightDisabled(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      let timeoutId;
      const handleScroll = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateScrollButtons, 150);
      };

      scrollElement.addEventListener('scroll', handleScroll);
      updateScrollButtons(); // Check initial state

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 100); // Update after animation
    }
  };

  return (
    <div className="relative w-full">
      <>
        {title ? (
          <div className="mx-10 my-5 text-2xl font-bold">{title}</div>
        ) : (
          <>
            <Skeleton className="mx-10 my-5 w-60 h-10 text-2xl font-bold bg-slate-100" />
          </>
        )}
        {slider ? (
          <div className="flex justify-end items-center px-4 mb-3">
            <div className="flex gap-2 cursor-pointer group">
              <button
                className={`bg-[rgba(2,6,12,0.15)] p-2 rounded-4xl ${
                  isLeftDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => !isLeftDisabled && scroll('left')}
                disabled={isLeftDisabled}>
                <SlArrowLeft />
              </button>
              <button
                className={`bg-[rgba(2,6,12,0.15)] p-2 rounded-4xl ${
                  isRightDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => !isRightDisabled && scroll('right')}
                disabled={isRightDisabled}>
                <SlArrowRight />
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="flex relative flex-col justify-center items-start mt-4 mb-10 no-scrollbar">
          {slider ? (
            <div
              ref={scrollRef}
              className="flex overflow-hidden overflow-x-auto gap-4 px-4 space-x-2 rounded slides-container scrollbar-hide no-scrollbar scroll-smooth">
              {slider?.map((data) => (
                <Link
                  key={data.id}
                  target="__blank"
                  to={data?.action?.link}
                  className={`flex-shrink-0 rounded duration-500 slide snap-center`}>
                  <img
                    className={`object-cover ${style}`}
                    src={`${config.img_url}/${data.imageId}`}
                    alt="mountain_image"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex px-10 mt-10 gap-20">
              {Array.from({ length: 10 }).map((_, key) => (
                <Skeleton key={key} className="w-36 h-36 bg-slate-100" />
              ))}
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default FoodSlider;


