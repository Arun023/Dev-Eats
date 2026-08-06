import { useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";

/**
 * Swiggy-style offer detail modal.
 *
 * Props:
 *  - offer   : the raw offer info object (data.info from the slider)
 *  - onClose : () => void
 */
const OfferModal = ({ offer, onClose }) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!offer) return null;

  const tagColor = offer.offerTagColor || "#E46D47";
  const couponCode = offer.couponCode || offer.description || "";
  const title = buildTitle(offer.header);
  const descriptionText = buildDescription(offer);
  const tnc = buildTnc(offer);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Offer details"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <IoClose size={22} />
        </button>

        <div className="p-7 pt-6">
          {/* Coupon badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold mb-4"
            style={{ backgroundColor: `${tagColor}22`, color: tagColor }}
          >
            <MdLocalOffer size={16} />
            {couponCode}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {descriptionText}
          </p>

          {/* Divider */}
          <hr className="my-5 border-gray-200" />

          {/* Terms & Conditions */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              Terms and Conditions
            </h3>
            <ul className="space-y-2">
              {tnc.map((line, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expiry — only if it's a real date */}
          {offer.expiryTime && offer.expiryTime !== "1970-01-01T00:00:00Z" && (
            <p className="mt-4 text-xs text-gray-400">
              Offer valid till {formatExpiry(offer.expiryTime)}
            </p>
          )}
        </div>
      </div>

      <style>{modalAnimation}</style>
    </div>
  );
};

/* ─── Helpers ────────────────────────────────────────────── */

/** "66% OFF UPTO ₹126" → "Get 66% off" */
function buildTitle(header = "") {
  const match = header.match(/(\d+%\s*off)/i);
  if (match) return `Get ${match[1].toLowerCase()}`;
  return header;
}

function buildDescription(offer) {
  const code = offer.couponCode || "";
  const header = offer.header || "";
  const desc = offer.description || "";
  const primary = offer.primaryDescription || "";

  if (code && header) {
    return `Use code ${code} & get ${header.toLowerCase()}${
      desc ? ` on orders ${desc.toLowerCase()}` : ""
    }.${primary ? `\n${primary}` : ""}`;
  }
  return [header, desc, primary].filter(Boolean).join(" • ");
}

function buildTnc(offer) {
  const lines = [
    "Offer is valid only on select restaurants",
    "Coupon code can be applied only once in 2 hr on this restaurant",
    "Other T&Cs may apply",
  ];
  if (offer.expiryTime && offer.expiryTime !== "1970-01-01T00:00:00Z") {
    lines.push(`Offer valid till ${formatExpiry(offer.expiryTime)}`);
  }
  return lines;
}

function formatExpiry(isoString) {
  try {
    return new Date(isoString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

const modalAnimation = `
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.93) translateY(12px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
  .animate-modal-in {
    animation: modalIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

export default OfferModal;
