import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import RestaurantCard from "./RestaurantCard";

const ResturantSlider = ({ slider }) => {
  //   const NewlyOpenRestaurant = isVegRestaurant(RestaurantCard);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Attach Embla events for button state
  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();

    emblaApi.on("init", updateButtons);
    emblaApi.on("select", updateButtons);
    emblaApi.on("settle", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("init", updateButtons);
      emblaApi.off("select", updateButtons);
      emblaApi.off("settle", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  // Re-init when slider data loads (null → array)
  useEffect(() => {
    if (emblaApi && slider) {
      emblaApi.reInit();
    }
  }, [emblaApi, slider]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <>
      {/* Arrows */}
      <div className="flex items-end justify-end gap-4">
        <button
          onClick={scrollPrev}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`bg-gray-300 rounded-full py-3 px-3 transition-all duration-200 ${
            canScrollLeft
              ? "cursor-pointer hover:bg-gray-400"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <SlArrowLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`bg-gray-300 rounded-full py-3 px-3 transition-all duration-200 ${
            canScrollRight
              ? "cursor-pointer hover:bg-gray-400"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <SlArrowRight size={20} />
        </button>
      </div>

      {/* Slider */}
      <div className="flex flex-col justify-center items-start mb-10 mt-4 relative">
        <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex gap-3">
            {slider?.map((data) => (
              <div
                key={data?.info?.id}
                className="w-[19.5rem] shrink-0 rounded overflow-hidden"
              >
                <RestaurantCard data={{ ...data.info }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResturantSlider;
