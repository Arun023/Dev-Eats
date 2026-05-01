import { useRef, useState, useCallback, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { config } from "../../../config/config";

const OfferSlider = ({ offers }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8; // responsive scroll

    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateButtons();

    el.addEventListener("scroll", updateButtons, { passive: true });

    // modern browser support
    el.addEventListener("scrollend", updateButtons);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      el.removeEventListener("scrollend", updateButtons);
    };
  }, [updateButtons]);

  console.log('custom logger [offers]',offers);


  if (!offers?.length) return null;

  return (
    <div className="relative w-full">
      {/* Arrows */}
      <div className="flex mb-3 gap-2 justify-between">
        <div className="text-xl font-bold">Deals for you</div>
        <div className="flex justify-end mb-3 gap-2">

          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition ${canScrollLeft
              ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
              }`}
          >
            <SlArrowLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition ${canScrollRight
              ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
              }`}
          >
            <SlArrowRight />
          </button>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {offers.map((data) => (
          <div
            key={data?.info?.id}
            className="min-w-[300px] border border-gray-200 px-3 py-2 rounded-2xl flex items-center gap-3"
          >
            <img
              className="w-10 h-10"
              src={`${config.img_url}/${data?.info?.offerLogo}`}
              alt="offer"
            />

            <div className="w-60">
              <div className="font-bold">
                {data?.info?.header}
              </div>

              <div className="text-[14px] tracking-tighter font-[600]  text-gray-500">
                {data?.info?.couponCode ||
                  data?.info?.description ||
                  data?.info?.primaryDescription}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferSlider;