import { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import useEmblaCarousel from "embla-carousel-react";

import { Skeleton } from "../../../components/ui/Skeleton";
import { config } from "../../../config/config";

const FoodSlider = ({ style, slider, title }) => {
  // Embla replaces: useRef + all scroll state + listeners + ResizeObserver + RAF hacks
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start", // items start from left edge
    dragFree: true, // smooth free drag (mouse + touch)
    containScroll: "trimSnaps", // prevents over-scroll at edges
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Embla tells us exactly when prev/next is possible — no manual math needed
  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Attach Embla events — replaces scroll + scrollend + ResizeObserver listeners
  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();

    emblaApi.on("init", updateButtons);
    emblaApi.on("select", updateButtons); // fires after each scroll step
    emblaApi.on("settle", updateButtons); // fires when scroll animation ends
    emblaApi.on("reInit", updateButtons); // fires after reinit (resize, data change)

    return () => {
      emblaApi.off("init", updateButtons);
      emblaApi.off("select", updateButtons);
      emblaApi.off("settle", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  // When slider data loads (null → array), reinit so Embla measures new slides
  useEffect(() => {
    if (emblaApi && slider) {
      emblaApi.reInit();
    }
  }, [emblaApi, slider]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`p-2 rounded-full transition-all duration-200 ${
              canScrollLeft
                ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <SlArrowLeft />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`p-2 rounded-full transition-all duration-200 ${
              canScrollRight
                ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <SlArrowRight />
          </button>
        </div>
      )}

      {/* Slider — Embla needs: viewport (overflow-hidden) > container (flex) > slides */}
      <div className="mt-4 mb-10">
        {slider ? (
          <div ref={emblaRef} className="overflow-hidden px-4">
            <div className="flex gap-4">
              {slider.map((data) => (
                <Link
                  key={data.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  to={data?.action?.link}
                  className="shrink-0 rounded-lg transition-transform duration-300 hover:scale-105"
                >
                  <img
                    className={`object-cover ${style}`}
                    src={`${config.img_url}/${data.imageId}`}
                    alt={data.title || "food"}
                    loading="lazy"
                    draggable={false}
                  />
                </Link>
              ))}
            </div>
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
