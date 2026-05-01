import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { IoStar } from 'react-icons/io5';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config/config';
import { addToCart, clearCart, removeItem } from '../../../store/slices/cartSlice';
const FoodList = ({ restaurant, ...itemCards }) => {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart.items);
  const [showModal, setShowModal] = useState(false);

  const ExistingRestaurant = Cart.find(
    (data) => data.restaurant.info.id === restaurant.info.id
  );
  const ExitingItem = Cart.find(
    (ele) => ele.item.id === itemCards?.card.info.id
  );

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
                    className="border-[3px] text-green-500 font-bold border-green-500 w-full h-14">
                    NO
                  </button>
                  <button
                    onClick={() => AddNewItem(itemCards?.card?.info)}
                    className="border-2 border-green-600 w-full h-14 bg-green-600 text-white font-semibold">
                    YES, START AFRESH
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div
        key={itemCards?.card.info.id}
        className="border-b-2 my-5 py-5 flex flex-col">
        <div className="flex gap-4 justify-between items-center relative">
          <div className="w-9/12">
            <div className="flex items-center gap-2">
              <div
                className={`${
                  itemCards?.card.info.itemAttribute?.vegClassifier === 'VEG'
                    ? 'veg'
                    : 'nonveg'
                }`}></div>
              <span className="flex justify-center items-center gap-1">
                {itemCards?.card.info.isBestseller && (
                  <>
                    <IoStar color="#ee9c00" />
                    <span className="text-sm font-semibold text-[#ee9c00]">
                      Bestseller
                    </span>
                  </>
                )}
              </span>
            </div>
            <div className="text-lg font-semibold text-gray-600 mt-1">
              {itemCards?.card.info.name}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <MdOutlineCurrencyRupee />
                {itemCards?.card.info.price
                  ? itemCards?.card.info.price / 100
                  : itemCards?.card.info.defaultPrice / 100}
              </div>
              {itemCards?.card.info.offerTags && (
                <span
                  className={`${
                    itemCards?.card.info.offerTags[0]?.backgroundColor &&
                    'bg-[#FAE8E3] text-[#DB6742] text-sm px-2'
                  } `}>
                  <span className="font-semibold">
                    {itemCards?.card.info.offerTags[0]?.title}
                  </span>{' '}
                  | {itemCards?.card.info.offerTags[0]?.subTitle}
                </span>
              )}
            </div>
            <p className="my-5 text-gray-400 text-sm">
              {itemCards?.card.info.description}
            </p>
          </div>
          {itemCards?.card.info.imageId ? (
            <div className="relative">
              <div className="">
                <img
                  src={`${config.img_url}/${itemCards?.card.info.imageId}`}
                  className="w-36 h-24 object-cover rounded-xl"
                  alt=""
                />
              </div>
              <div className="flex items-center addCard">
                {ExitingItem ? (
                  <div className="border-2 border-gray-200 gap-3 flex px-6 py-2 bg-stone-50 rounded-lg">
                    <span
                      className="text-center mx-auto  font-medium rounded-lg  cursor-pointer"
                      onClick={() => RemoveItem(itemCards?.card?.info)}>
                      -
                    </span>
                    <span>{ExitingItem?.count}</span>
                    <span
                      className="text-center mx-auto  font-medium rounded-lg  cursor-pointer"
                      onClick={() => AddItem(itemCards?.card?.info)}>
                      +
                    </span>
                  </div>
                ) : (
                  <button
                    className="text-center mx-auto border-2 bg-slate-100 border-gray-200 px-8 py-2 shadow-xl  duration-200 text-green-500  font-bold rounded-lg  cursor-pointer"
                    onClick={() => AddItem(itemCards?.card?.info)}>
                    ADD
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center absolute right-5 bottom-0">
              {ExitingItem ? (
                <div className="border-2 border-gray-200 gap-3 flex px-6 py-2 bg-stone-50 rounded-lg">
                  <span
                    className="text-center mx-auto font-medium rounded-lg cursor-pointer bg-slate-100 border-gray-200 shadow-xl"
                    onClick={() => RemoveItem(itemCards?.card?.info)}>
                    -
                  </span>
                  <span>{ExitingItem?.count}</span>
                  <span
                    className="text-center mx-auto  font-medium rounded-lg  cursor-pointer"
                    onClick={() => AddItem(itemCards?.card?.info)}>
                    +
                  </span>
                </div>
              ) : (
                <button
                  className="text-center mx-auto border-2 bg-slate-100 border-gray-200 px-8 py-2 shadow-xl  duration-200 text-green-500  font-bold rounded-lg  cursor-pointer"
                  onClick={() => AddItem(itemCards?.card?.info)}>
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodList;
