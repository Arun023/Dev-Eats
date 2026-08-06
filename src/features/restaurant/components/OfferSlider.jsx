import { useState, useCallback, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { config } from "../../../config/config";
import useEmblaCarousel from "embla-carousel-react";
import OfferModal from "./OfferModal";

const OfferSlider = ({ offers }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  /* ── Embla setup ─────────────────────────────────────── */

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("settle", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("settle", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  useEffect(() => {
    if (emblaApi && offers) emblaApi.reInit();
  }, [emblaApi, offers]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!offers?.length) return null;

  return (
    <div className="relative w-full">
      {/* Header row */}
      <div className="flex mb-3 gap-2 justify-between">
        <div className="text-xl font-bold">Deals for you</div>
        <div className="flex justify-end mb-3 gap-2">
          <button
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Previous offer"
            className={`p-2 rounded-full transition ${
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
            aria-label="Next offer"
            className={`p-2 rounded-full transition ${
              canScrollRight
                ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <SlArrowRight />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {offers.map((data) => (
            <button
              type="button"
              key={data?.info?.id}
              onClick={() => setSelectedOffer(data?.info)}
              className="min-w-[300px] flex-shrink-0 border border-gray-200 px-3 py-2 rounded-2xl flex items-center gap-3 text-left hover:border-gray-400 hover:shadow-sm transition cursor-pointer bg-white"
            >
              <img
                className="w-10 h-10"
                src={`${config.img_url}/${data?.info?.offerLogo}`}
                alt="offer"
              />
              <div className="w-60">
                <div className="font-bold">{data?.info?.header}</div>
                <div className="text-[14px] tracking-tighter font-[600] text-gray-500">
                  {data?.info?.couponCode ||
                    data?.info?.description ||
                    data?.info?.primaryDescription}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Offer detail modal */}
      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
};

export default OfferSlider;
