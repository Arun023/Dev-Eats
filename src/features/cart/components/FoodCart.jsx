import React from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { addToCart, removeItem } from '../../../store/slices/cartSlice';

const FoodCart = ({ item, count, restaurant }) => {
  const { name, id, price, defaultPrice, isVeg } = item;
  const dispatch = useDispatch();
  const AddItem = () => {
    dispatch(addToCart({ item: item, restaurant: restaurant }));
  };
  const RemoveItem = () => {
    dispatch(removeItem({ item: item }));
  };
  return (
    <>
      <div className="flex gap-3 items-center  p-2 m-2 ">
        <div className="flex items-start gap-3">
          <div className={`${isVeg ? 'veg' : 'nonveg'} mt-2`}></div>
          <div className="flex items-center gap-2 w-48">
            <div className="text-base">{name}</div>
          </div>
        </div>
        <div className="border border-gray-400 justify-between flex items-center">
          <button
            onClick={() => RemoveItem()}
            className="px-4 text-gray-500 text-2xl flex items-center justify-center">
            -
          </button>
          <span className="text-green-500 font-bold">{count}</span>
          <button
            onClick={() => AddItem()}
            className="px-4 text-gray-500 text-2xl flex items-center justify-center">
            +
          </button>
        </div>
        <div className="text-base flex items-center">
          <MdOutlineCurrencyRupee />
          {price ? (price / 100) * count : (defaultPrice / 100) * count}
        </div>
      </div>
    </>
  );
};

export default FoodCart;
