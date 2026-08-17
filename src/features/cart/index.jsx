import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FoodCart from './components/FoodCart';
import EmptyCart from './../../assets/empty_cart.avif';
import {
  MdOutlineCurrencyRupee,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdOutlineLocalOffer,
  MdArrowForward,
  MdCheckCircle,
  MdDeleteOutline,
  MdOutlineShield,
  MdOutlinePedalBike,
  MdOutlineNotes,
  MdStorefront,
} from 'react-icons/md';
import { TotalPrice } from '../../utils/index';
import { config } from '../../config/config';
import { clearCart } from '../../store/slices/cartSlice';

const CartView = () => {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart.items);

  // Coupons state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Pricing calculations
  const restaurantInfo = Cart[0]?.restaurant?.info;
  const DeliveryFee = restaurantInfo?.feeDetails?.amount
    ? +restaurantInfo.feeDetails.amount
    : restaurantInfo?.feeDetails?.totalFee
    ? restaurantInfo.feeDetails.totalFee / 100
    : 50;

  const PlateFormFee = 5;
  const TotalItemPrice = TotalPrice();
  const GST = Math.round((5 / 100) * TotalItemPrice);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'WELCOME50') {
    discountAmount = Math.min(Math.round(TotalItemPrice * 0.5), 100);
  } else if (appliedCoupon === 'DEVEATS20') {
    discountAmount = Math.round(TotalItemPrice * 0.2);
  } else if (appliedCoupon === 'FREEDEL') {
    discountAmount = DeliveryFee;
  }

  const TotalAmount = Math.max(
    0,
    TotalItemPrice + DeliveryFee + PlateFormFee + GST - discountAmount
  );

  const totalCount = Cart.reduce((acc, curr) => acc + curr.count, 0);

  const handleApplyCoupon = (codeToApply) => {
    const targetCode = (codeToApply || couponCode).trim().toUpperCase();
    if (!targetCode) return;

    if (targetCode === 'WELCOME50' || targetCode === 'DEVEATS20' || targetCode === 'FREEDEL') {
      setAppliedCoupon(targetCode);
      setCouponCode(targetCode);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME50 or DEVEATS20');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
  };

  // Empty Cart State
  if (Cart.length === 0) {
    return (
      <div className="min-h-[85vh] pt-24 pb-16 px-4 bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-100/80 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-40 h-40 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
              <img
                src={EmptyCart}
                alt="empty_cart"
                className="w-36 h-36 object-contain drop-shadow-md"
              />
            </div>
            <span className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
              <MdStorefront className="text-xl" />
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Your Cart is Empty
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 mb-8 leading-relaxed">
            Good food is always waiting for you. Explore top-rated restaurants near you!
          </p>

          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl hover:shadow-emerald-600/40 transition-all duration-200 active:scale-98"
          >
            <span>Browse Restaurants</span>
            <MdArrowForward className="text-xl" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-20 bg-slate-100/70 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Checkout & Order Summary
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              You have <span className="font-semibold text-slate-700">{totalCount} item{totalCount > 1 ? 's' : ''}</span> in your cart
            </p>
          </div>

          <button
            onClick={handleClearCart}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <MdDeleteOutline className="text-base" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Items & Delivery Details) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Restaurant Info Header Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-start gap-4 sm:gap-5">
              {restaurantInfo?.cloudinaryImageId ? (
                <img
                  src={`${config.img_url}/${restaurantInfo.cloudinaryImageId}`}
                  alt={restaurantInfo.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl shadow-sm border border-slate-100 shrink-0"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0">
                  {restaurantInfo?.name?.[0] || 'R'}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1 border border-emerald-100">
                  <MdStorefront className="text-sm" />
                  <span>Cloud Kitchen</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 truncate">
                  {restaurantInfo?.name || 'Restaurant'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                  {restaurantInfo?.locality || restaurantInfo?.areaName || 'Main City Area'}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600 mt-2">
                  <span className="flex items-center gap-1">
                    <MdOutlineAccessTime className="text-emerald-600 text-sm" />
                    {restaurantInfo?.sla?.slaString || '25-30 Mins ETA'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MdOutlinePedalBike className="text-emerald-600 text-sm" />
                    {restaurantInfo?.sla?.lastMileTravelString || '2.3 km away'}
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Food Items Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                  Selected Items
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  {Cart.length} Unique item{Cart.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {Cart.map((data) => (
                  <FoodCart
                    key={data.item.id}
                    restaurant={data.restaurant}
                    count={data.count}
                    {...data}
                  />
                ))}
              </div>
            </div>

            {/* Delivery Address & Notes Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MdOutlineLocationOn className="text-xl text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      Delivery Location
                    </h4>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Home
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Flat 402, Highrise Heights, Tech Park Road, Bengaluru
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                  <MdOutlineNotes className="text-base text-slate-500" />
                  <span>Cooking / Delivery Instructions (Optional)</span>
                </label>
                <textarea
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Please leave at door, don't ring doorbell, avoid plastic cutlery..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none bg-slate-50/50"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Summary & Checkout) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Promo / Coupon Box Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <MdOutlineLocalOffer className="text-xl text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-base">
                  Coupons & Offers
                </h3>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/70 p-3 rounded-xl text-emerald-800">
                  <div className="flex items-center gap-2">
                    <MdCheckCircle className="text-xl text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-xs sm:text-sm">
                        '{appliedCoupon}' Applied
                      </p>
                      <p className="text-xs text-emerald-700">
                        You saved ₹{discountAmount}!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none uppercase font-semibold text-slate-800 placeholder:normal-case placeholder:font-normal"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors active:scale-95 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs font-medium text-rose-500 mt-2">
                      {couponError}
                    </p>
                  )}

                  {/* Preset Quick Coupons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApplyCoupon('WELCOME50')}
                      className="text-[11px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-all cursor-pointer"
                    >
                      🏷️ WELCOME50 (50% OFF)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon('FREEDEL')}
                      className="text-[11px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-all cursor-pointer"
                    >
                      🚴 FREEDEL (Free Delivery)
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Bill Details Breakdown Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-4">
                Bill Details
              </h3>

              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Item Total ({totalCount} items)</span>
                  <span className="flex items-center font-medium text-slate-800">
                    <MdOutlineCurrencyRupee /> {TotalItemPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>Delivery Fee</span>
                    <span className="text-[10px] text-slate-400">({restaurantInfo?.sla?.lastMileTravelString || '2.3 km'})</span>
                  </span>
                  <span className="flex items-center font-medium text-slate-800">
                    <MdOutlineCurrencyRupee /> {DeliveryFee}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Platform Fee</span>
                  <span className="flex items-center font-medium text-slate-800">
                    <MdOutlineCurrencyRupee /> {PlateFormFee}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span>GST & Restaurant Charges</span>
                  <span className="flex items-center font-medium text-slate-800">
                    <MdOutlineCurrencyRupee /> {GST}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                    <span>Coupon Discount</span>
                    <span className="flex items-center">
                      - <MdOutlineCurrencyRupee /> {discountAmount}
                    </span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center text-slate-900 font-extrabold text-lg sm:text-xl">
                  <span>Total Amount</span>
                  <span className="flex items-center text-emerald-600">
                    <MdOutlineCurrencyRupee className="text-base" /> {TotalAmount}
                  </span>
                </div>
              </div>

              {/* Savings callout banner */}
              {discountAmount > 0 && (
                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold px-3 py-2 rounded-xl text-center">
                  🎉 You saved a total of ₹{discountAmount} on this order!
                </div>
              )}

              {/* Checkout Action CTA */}
              <button
                onClick={handleCheckout}
                className="w-full mt-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all duration-200 flex items-center justify-between active:scale-98 cursor-pointer"
              >
                <div className="text-left">
                  <div className="text-xs text-emerald-100 font-medium">TOTAL PAYABLE</div>
                  <div className="text-lg font-black flex items-center">
                    <MdOutlineCurrencyRupee /> {TotalAmount}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm sm:text-base font-extrabold tracking-wide">
                  <span>Proceed to Pay</span>
                  <MdArrowForward className="text-xl" />
                </div>
              </button>
            </div>

            {/* Safety & Trust Badges */}
            <div className="bg-slate-200/50 rounded-2xl p-4 border border-slate-200/60 flex items-center justify-around text-slate-600 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <MdOutlineShield className="text-emerald-600 text-lg" />
                <span>Safe Checkout</span>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <MdCheckCircle className="text-emerald-600 text-lg" />
                <span>100% Hygienic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Placed Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <MdCheckCircle />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Order Confirmed!</h3>
            <p className="text-slate-500 text-sm mt-2 mb-6">
              Your food is being prepared by <span className="font-semibold text-slate-800">{restaurantInfo?.name}</span> and will be delivered shortly.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  dispatch(clearCart());
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;

