import { Link, useSearchParams } from "react-router-dom";
// import StarIcon from '../assets/icons/ic_star';
import { config } from "../../../config/config";
const RestaurantCard = ({ data }) => {
  const [searchParams] = useSearchParams();
  const {
    id,
    name,
    cuisines,
    avgRating,
    cloudinaryImageId,
    sla,
    areaName,
    aggregatedDiscountInfoV3,
  } = data;
  const latitude = searchParams.get("latitude");
  const langitude = searchParams.get("langitude");

  const PLACEHOLDER_IMG =
    "https://media-assets.swiggy.com/swiggy/image/upload/dls-web/assets/images/placeholder-light.png";

  const imgSrc = cloudinaryImageId
    ? `${config.img_url}/${cloudinaryImageId}`
    : PLACEHOLDER_IMG;

  return (
    <Link
      to={`/restaurant/${id}${latitude ? "/" : ""}${latitude ? latitude : ""}${
        langitude ? "/" : ""
      }${langitude ? langitude : ""}`}
      className="flex flex-col relative w-[19.5rem] hover:scale-95 duration-200"
      key={id}
    >
      <img
        src={imgSrc}
        className="w-[19.5rem] h-52 object-cover rounded-2xl"
        alt={name || "Restaurant"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = PLACEHOLDER_IMG;
        }}
      />
      {aggregatedDiscountInfoV3 && (
        <div className=" text-white coupon__background px-3 flex justify-start text-xl font-bold items-center uppercase h-16 absolute bottom-24 rounded-b-2xl w-[19.5rem]">
          {`${aggregatedDiscountInfoV3?.header} ${
            aggregatedDiscountInfoV3.subHeader
              ? aggregatedDiscountInfoV3?.subHeader
              : ""
          }`}
        </div>
      )}
      <div className="font-semibold">{name}</div>
      <div className="flex gap-3 items-center font-semibold">
        <div className="flex gap-1.5">
          {/* <StarIcon /> */}
          {avgRating}
        </div>
        <div className="flex gap-1">
          <span>•</span>
          {sla?.slaString}
        </div>
      </div>
      <div className="font-light text-gray-700">
        {cuisines?.slice(0, 3).join(", ")}
      </div>
      <div className="font-light text-gray-700">{areaName?.slice(0, 31)}</div>
    </Link>
  );
};

export default RestaurantCard;
