import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { StateList } from "../data";

// Icons
import { IoSearch, IoHomeOutline, IoMenu, IoClose } from "react-icons/io5";
import { TbDiscount } from "react-icons/tb";
import { GrContactInfo } from "react-icons/gr";
import { BsCart, BsCart3 } from "react-icons/bs";
import { HiOutlineUser, HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

import AppIcon from "../assets/icons/ic_app_icon";
import { setLocation } from "../store/slices/authSlice";

import { Sheet, SheetClose, SheetContent } from "../components/ui/Sheet";

// ─── Nav items config ──────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: "/", Icon: IoHomeOutline, label: "Home" },
  { to: "/search", Icon: IoSearch, label: "Search" },
  { to: "/about", Icon: TbDiscount, label: "Offers" },
  { to: "/contact", Icon: GrContactInfo, label: "Help" },
];

const Header = () => {
  const [logged, setLogged] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [citySearch, setCitySearch] = useState(""); // search filter for city picker

  const dispatch = useDispatch();
  const location = useLocation();

  const cartItems = useSelector((state) => state.cart.items);
  const city = useSelector((state) => state.auth.city);

  const handleCityChange = (event) => {
    const data = JSON.parse(event.target.value);
    dispatch(setLocation(data));
    setCityOpen(false);
  };

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      {/* ═══════════════ HEADER BAR ═══════════════ */}
      <header className="flex sticky top-0 z-40 justify-between items-center px-6 md:px-24 py-4 shadow-md bg-white border-b border-gray-100">
        {/* Left — Logo + City */}
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center">
            <AppIcon size={30} />
          </Link>

          <button
            onClick={() => setCityOpen(true)}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            <MdLocationOn size={16} className="text-orange-500" />
            <span className="max-w-[100px] truncate">
              {city || "Select City"}
            </span>
            <svg
              className="w-3 h-3 ml-0.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Center/Right — Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ to, Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(to)
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/cart")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
            }`}
          >
            <BsCart3 size={17} />
            Cart
            {cartItems?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          <button
            onClick={() => setLogged(!logged)}
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            {logged ? "Logout" : "Login"}
          </button>
        </nav>

        {/* Mobile — Hamburger + Cart badge */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <BsCart size={20} />
            {cartItems?.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-orange-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <IoMenu size={24} />
          </button>
        </div>
      </header>

      {/* ═══════════════ CITY PICKER SHEET ═══════════════ */}
      <Sheet open={cityOpen} onOpenChange={(open) => { setCityOpen(open); if (!open) setCitySearch(""); }}>
        <SheetContent
          side="left"
          className="bg-white w-[85vw] sm:w-[380px] h-full shadow-2xl p-0 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50 shrink-0">
            <div className="flex items-center gap-2.5">
              <MdLocationOn size={20} className="text-orange-500" />
              <h2 className="text-base font-semibold text-gray-800">Select City</h2>
            </div>
            <button
              onClick={() => { setCityOpen(false); setCitySearch(""); }}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-white/70 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>
          </div>

          {/* Search box */}
          <div className="px-4 py-3 border-b border-gray-100 shrink-0">
            <div className="relative">
              <IoSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search city..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Currently selected */}
          {city && (
            <div className="px-4 pt-3 pb-1 shrink-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Current Location</p>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-orange-50 border border-orange-200">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{city.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-orange-700">{city}</span>
                <MdLocationOn size={14} className="ml-auto text-orange-400" />
              </div>
            </div>
          )}

          {/* City list */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">All Cities</p>
            <div className="space-y-1">
              {StateList
                .filter((d) =>
                  d.city.toLowerCase().includes(citySearch.toLowerCase())
                )
                .map((data, index) => {
                  const selected = city === data.city;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        dispatch(setLocation({ lng: data.lng, lat: data.lat, city: data.city }));
                        setCityOpen(false);
                        setCitySearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        selected
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        selected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {data.city.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium">{data.city}</span>
                      {selected && (
                        <svg className="ml-auto w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              {StateList.filter((d) =>
                d.city.toLowerCase().includes(citySearch.toLowerCase())
              ).length === 0 && (
                <div className="flex flex-col items-center py-10 text-gray-400">
                  <MdLocationOn size={32} className="mb-2 opacity-30" />
                  <p className="text-sm">No cities found</p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══════════════ MOBILE NAV SHEET ═══════════════ */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} >
        <SheetContent
          side="left"
          className="bg-white w-[80vw] sm:w-[340px] h-full shadow-2xl p-0 overflow-hidden flex flex-col"
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-center gap-3">
              <AppIcon size={28} />
              <span className="font-bold text-gray-900 text-lg tracking-tight">
                Dev Eats
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-white/70 hover:text-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* ── User Avatar Section ── */}
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-md">
                <HiOutlineUser size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {logged ? "Welcome back!" : "Hello, Guest"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {logged ? "Manage your account" : "Sign in to order food"}
                </p>
              </div>
            </div>

            {/* City row */}
            <button
              onClick={() => {
                setMobileOpen(false);
                setCityOpen(true);
              }}
              className="mt-4 flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-orange-50 border border-orange-100 text-sm text-orange-600 font-medium hover:bg-orange-100 transition-colors"
            >
              <MdLocationOn size={16} />
              <span className="flex-1 text-left truncate">
                {city || "Select your city"}
              </span>
              <svg
                className="w-3.5 h-3.5 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* ── Nav Items ── */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(({ to, Icon, label }) => (
              <SheetClose asChild key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(to)
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                  }`}
                >
                  <Icon size={19} />
                  <span>{label}</span>
                  {!isActive(to) && (
                    <svg
                      className="ml-auto w-3.5 h-3.5 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </Link>
              </SheetClose>
            ))}

            {/* Cart */}
            <SheetClose asChild>
              <Link
                to="/cart"
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                  isActive("/cart")
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                }`}
              >
                <BsCart3 size={19} />
                <span>Cart</span>
                {cartItems?.length > 0 && (
                  <span
                    className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                      isActive("/cart")
                        ? "bg-white/30 text-white"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </span>
                )}
                {!isActive("/cart") && cartItems?.length === 0 && (
                  <svg
                    className="ml-auto w-3.5 h-3.5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </Link>
            </SheetClose>
          </nav>

          {/* ── Footer — Login/Logout ── */}
          <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => {
                setLogged(!logged);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                logged
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200"
              }`}
            >
              {logged ? (
                <>
                  <HiOutlineLogout size={18} /> Logout
                </>
              ) : (
                <>
                  <HiOutlineLogin size={18} /> Login / Sign Up
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-gray-400 mt-3">
              Dev Eats · Fast food delivery
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
