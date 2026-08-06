import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../config/config";
import {
  addToCart,
  clearCart,
  removeItem,
} from "../../../store/slices/cartSlice";
const FoodList = ({ restaurant, ...itemCards }) => {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart.items);
  const [showModal, setShowModal] = useState(false);

  const foodItemCard = itemCards?.card?.info;

  const ExistingRestaurant = Cart.find(
    (data) => data.restaurant.info.id === restaurant.info.id,
  );
  const ExitingItem = Cart.find((ele) => ele.item.id === foodItemCard.id);

  const AddItem = (id) => {
    if (ExistingRestaurant || Cart?.length === 0)
      dispatch(addToCart({ item: id, restaurant: restaurant }));
    else setShowModal(true);
  };

  const AddNewItem = (id) => {
    setShowModal(false);
    dispatch(clearCart());
    dispatch(addToCart({ item: id, restaurant: restaurant }));
  };

  const RemoveItem = (id) => {
    dispatch(removeItem({ item: id }));
  };

  const rating = foodItemCard?.ratings?.aggregatedRating?.rating;
  const ratingCount =
    foodItemCard?.ratings?.aggregatedRating?.ratingCountV2 ||
    foodItemCard?.ratings?.aggregatedRating?.ratingCount;

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed bottom-0 justify-center items-end flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-4/12 my-6 mx-auto">
              <div className="items-start justify-between px-8 py-5 border-b border-solid border-blueGray-200 rounded-t border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-300 outline-none focus:outline-none">
                <div className="text-2xl font-bold pt-5">
                  Items already in cart
                </div>
                <p className="text-base font-normal text-gray-700 pb-5">
                  Your cart contains items from other restaurant. Would you like
                  to reset your cart for adding items from this restaurant?
                </p>
                <div className="w-full flex gap-3 pb-5">
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className="border-[3px] text-green-500 font-bold border-green-500 w-full h-14"
                  >
                    NO
                  </button>
                  <button
                    onClick={() => AddNewItem(foodItemCard)}
                    className="border-2 border-green-600 w-full h-14 bg-green-600 text-white font-semibold"
                  >
                    YES, START AFRESH
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div key={foodItemCard.id} className="border-b border-gray-200 py-6 flex justify-between items-start gap-4">
        <div className="w-8/12 md:w-9/12 flex flex-col">
          <div className="flex items-center gap-2">
            <div
              className={`${
                foodItemCard.itemAttribute?.vegClassifier === "VEG"
                  ? "veg"
                  : "nonveg"
              }`}
            ></div>
            {foodItemCard.isBestseller && (
              <span className="flex items-center gap-1 text-xs font-semibold text-[#ee9c00]">
                <IoStar color="#ee9c00" />
                Bestseller
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mt-1">
            {foodItemCard.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 font-bold text-gray-800 text-base">
            {foodItemCard?.isNinetyninestoreItem && foodItemCard?.finalPrice ? (
              <>
                <div className="flex items-center text-gray-400 line-through text-sm font-normal">
                  <MdOutlineCurrencyRupee />
                  {foodItemCard.price
                    ? foodItemCard.price / 100
                    : foodItemCard.defaultPrice / 100}
                </div>
                <div className="flex items-center bg-[#5255f3] text-white px-2 py-0.5 rounded-sm font-bold text-sm">
                  <MdOutlineCurrencyRupee />{foodItemCard.finalPrice / 100}
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <MdOutlineCurrencyRupee />
                {foodItemCard.price
                  ? foodItemCard.price / 100
                  : foodItemCard.defaultPrice / 100}
              </div>
            )}
            {foodItemCard.offerTags && (
              <span
                className={`${
                  foodItemCard.offerTags[0]?.backgroundColor &&
                  "bg-[#FAE8E3] text-[#DB6742] text-sm px-2"
                } `}
              >
                <span className="font-semibold">
                  {foodItemCard.offerTags[0]?.title}
                </span>{" "}
                {foodItemCard.offerTags[0]?.subTitle}
              </span>
            )}
          </div>
          {rating && (
            <div className="flex items-center gap-1 mt-1 text-xs md:text-sm font-bold text-emerald-700">
              <IoStar className="text-emerald-700 fill-current" />
              <span>{rating}</span>
              {ratingCount && (
                <span className="text-gray-500 font-normal">({ratingCount})</span>
              )}
            </div>
          )}
          {foodItemCard.description && (
            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              {foodItemCard.description}
            </p>
          )}
        </div>
        {foodItemCard.imageId ? (
          <div className="relative flex flex-col items-center shrink-0 w-36 md:w-40">
            <img
              src={`${config.img_url}/${foodItemCard.imageId}`}
              className="w-36 h-28 md:w-40 md:h-32 object-cover rounded-2xl shadow-sm"
              alt={foodItemCard.name}
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
              {ExitingItem ? (
                <div className="border border-gray-300 bg-white shadow-md rounded-xl px-3 py-1.5 flex items-center gap-3 text-green-600 font-extrabold text-sm">
                  <span
                    className="cursor-pointer select-none px-1 text-gray-600 hover:text-green-600"
                    onClick={() => RemoveItem(foodItemCard)}
                  >
                    -
                  </span>
                  <span className="text-gray-800 font-bold">{ExitingItem?.count}</span>
                  <span
                    className="cursor-pointer select-none px-1 text-gray-600 hover:text-green-600"
                    onClick={() => AddItem(foodItemCard)}
                  >
                    +
                  </span>
                </div>
              ) : (
                <button
                  className="border border-gray-300 bg-white px-7 py-1.5 shadow-md hover:shadow-lg duration-200 text-green-600 font-bold rounded-xl cursor-pointer hover:bg-slate-50 text-sm tracking-wide"
                  onClick={() => AddItem(foodItemCard)}
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="shrink-0 w-36 md:w-40 flex justify-center items-center">
            {ExitingItem ? (
              <div className="border border-gray-300 bg-white shadow-md rounded-xl px-3 py-1.5 flex items-center gap-3 text-green-600 font-extrabold text-sm">
                <span
                  className="cursor-pointer select-none px-1 text-gray-600 hover:text-green-600"
                  onClick={() => RemoveItem(foodItemCard)}
                >
                  -
                </span>
                <span className="text-gray-800 font-bold">{ExitingItem?.count}</span>
                <span
                  className="cursor-pointer select-none px-1 text-gray-600 hover:text-green-600"
                  onClick={() => AddItem(foodItemCard)}
                >
                  +
                </span>
              </div>
            ) : (
              <button
                className="border border-gray-300 bg-white px-7 py-1.5 shadow-md hover:shadow-lg duration-200 text-green-600 font-bold rounded-xl cursor-pointer hover:bg-slate-50 text-sm tracking-wide"
                onClick={() => AddItem(foodItemCard)}
              >
                ADD
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FoodList;
