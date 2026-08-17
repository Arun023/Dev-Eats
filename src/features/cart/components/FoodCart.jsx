import React from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineCurrencyRupee, MdAdd, MdRemove, MdDeleteOutline, MdFastfood } from 'react-icons/md';
import { addToCart, removeItem } from '../../../store/slices/cartSlice';
import { config } from '../../../config/config';

const FoodCart = ({ item, count, restaurant }) => {
  const { name, price, defaultPrice, isVeg, imageId, description } = item;
  const dispatch = useDispatch();

  const unitPrice = price ? price / 100 : defaultPrice / 100;
  const itemTotalPrice = unitPrice * count;

  const handleAddItem = () => {
    dispatch(addToCart({ item, restaurant }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem({ item }));
  };

  // Determine veg classification fallback
  const isVegItem = isVeg !== undefined ? isVeg : item?.itemAttribute?.vegClassifier === 'VEG';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 my-3 bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 gap-4">
      {/* Item Info & Image */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Food Thumbnail */}
        <div className="relative shrink-0">
          {imageId ? (
            <img
              src={`${config.img_url}/${imageId}`}
              alt={name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-xs border border-slate-100"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100/50">
              <MdFastfood className="text-2xl" />
            </div>
          )}
          {/* Veg / Non-veg Badge on Thumbnail */}
          <span
            className={`absolute top-1 left-1 p-0.5 rounded-sm bg-white/90 backdrop-blur-xs border shadow-xs ${
              isVegItem ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full ${
                isVegItem ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </span>
        </div>

        {/* Title, Unit Price & Description */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800 text-base sm:text-lg truncate">
              {name}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
              {description}
            </p>
          )}
          <div className="flex items-center text-slate-500 font-medium text-xs sm:text-sm mt-1">
            <span>Unit Price:</span>
            <span className="flex items-center text-slate-700 ml-1 font-semibold">
              <MdOutlineCurrencyRupee className="text-xs" />
              {unitPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Controls & Price Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 shadow-inner">
          <button
            onClick={handleRemoveItem}
            title={count === 1 ? 'Remove item' : 'Decrease quantity'}
            className="w-8 h-8 rounded-lg bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-600 flex items-center justify-center shadow-xs transition-colors active:scale-95 cursor-pointer"
          >
            {count === 1 ? (
              <MdDeleteOutline className="text-lg text-rose-500" />
            ) : (
              <MdRemove className="text-lg" />
            )}
          </button>
          <span className="w-9 text-center font-bold text-slate-800 text-sm sm:text-base">
            {count}
          </span>
          <button
            onClick={handleAddItem}
            title="Increase quantity"
            className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors active:scale-95 cursor-pointer"
          >
            <MdAdd className="text-lg" />
          </button>
        </div>

        {/* Item Total Subtotal */}
        <div className="text-right min-w-[80px]">
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Subtotal
          </div>
          <div className="flex items-center justify-end font-bold text-slate-900 text-base sm:text-lg">
            <MdOutlineCurrencyRupee className="text-sm" />
            {itemTotalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;

