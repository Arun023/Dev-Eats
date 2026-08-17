import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import useEmblaCarousel from "embla-carousel-react";

import { Skeleton } from "../../../components/ui/Skeleton";
import { config } from "../../../config/config";

const FoodSlider = ({ style, slider, title }) => {
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

  useEffect(() => {
    if (emblaApi && slider) {
      emblaApi.reInit();
    }
  }, [emblaApi, slider]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="w-full my-6">
      {/* Header: Title on Left, Arrows on Right */}
      <div className="flex items-center justify-between mb-4">
        {title ? (
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        ) : (
          <Skeleton className="w-60 h-8 bg-slate-200 rounded-md" />
        )}

        {slider && (
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`p-2 rounded-full transition-all duration-200 ${
                canScrollLeft
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                  : "bg-gray-100 text-gray-400 opacity-40 cursor-not-allowed"
              }`}
            >
              <SlArrowLeft size={16} />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`p-2 rounded-full transition-all duration-200 ${
                canScrollRight
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                  : "bg-gray-100 text-gray-400 opacity-40 cursor-not-allowed"
              }`}
            >
              <SlArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Food Slider Viewport */}
      <div>
        {slider ? (
          <div ref={emblaRef} className="overflow-hidden w-full">
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
                    className={`object-cover ${style || 'w-36 h-36'}`}
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
          <div className="flex mt-4 gap-6 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-36 h-36 shrink-0 bg-slate-200 rounded-full" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSlider;
