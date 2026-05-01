import { useRef, useState, useEffect, useCallback } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../components/ui/Skeleton";
import { config } from "../../../config/config";

const FoodSlider = ({ style, slider, title }) => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ✅ Accurate button state detection
  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  // ✅ Smooth + responsive scroll
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;

    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Scroll listeners (no debounce hack needed)
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

  // ✅ Resize handling
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateButtons();
    });

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [updateButtons]);

  return (
    <div className="relative w-full">
      {/* Title */}
      {title ? (
        <div className="mx-10 my-5 text-2xl font-bold">{title}</div>
      ) : (
        <Skeleton className="mx-10 my-5 w-60 h-10 bg-slate-100" />
      )}

      {/* Arrows */}
      {slider && (
        <div className="flex justify-end px-4 mb-3 gap-2">
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
      )}

      {/* Slider */}
      <div className="mt-4 mb-10">
        {slider ? (
          <div
            ref={scrollRef}
            className="flex gap-4 px-4 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {slider.map((data) => (
              <Link
                key={data.id}
                target="_blank"
                to={data?.action?.link}
                className="flex-shrink-0 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  className={`object-cover ${style}`}
                  src={`${config.img_url}/${data.imageId}`}
                  alt={data.title || "food"}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex px-10 mt-10 gap-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-36 h-36 bg-slate-100" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSlider;