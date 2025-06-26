import { Link, useSearchParams } from 'react-router-dom';
// import StarIcon from '../assets/icons/ic_star';
import { config } from '../../../config/config';
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
  const latitude = searchParams.get('latitude');
  const langitude = searchParams.get('langitude');

  return (
    <Link
      to={`/restaurant/${id}${latitude ? '/' : ''}${latitude ? latitude : ''}${
        langitude ? '/' : ''
      }${langitude ? langitude : ''}`}
      className="flex flex-col relative w-full hover:scale-95 duration-200"
      key={id}>
      <img
        src={`${config.img_url}/${cloudinaryImageId}`}
        className="w-96 h-52 object-cover rounded-2xl"
        alt=""
      />
      {aggregatedDiscountInfoV3 && (
        <div className=" text-white coupon__background px-3 flex justify-start text-xl font-bold items-center uppercase h-16 absolute bottom-24 rounded-b-2xl w-96">
          {`${aggregatedDiscountInfoV3?.header} ${
            aggregatedDiscountInfoV3.subHeader
              ? aggregatedDiscountInfoV3?.subHeader
              : ''
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
        {cuisines?.slice(0, 3).join(', ')}
      </div>
      <div className="font-light text-gray-700">{areaName?.slice(0, 31)}</div>
    </Link>
  );
};

// export const isVegRestaurant = (RestaurantCard) => {
//   return ({ data }) => {
//     return (
//       <div className="relative">
//         <span className="absolute top-0 text-xl z-10 bg-green-500 text-white px-3 py-2">
//           Veg
//         </span>
//         <RestaurantCard data={data} />
//       </div>
//     );
//   };
// };

export default RestaurantCard;
