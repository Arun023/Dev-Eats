import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { StateList } from '../data';

import { IoSearch } from 'react-icons/io5';
import { TbDiscount } from 'react-icons/tb';
import { GrContactInfo } from 'react-icons/gr';
import { BsCart } from 'react-icons/bs';
import AppIcon from '../assets/icons/ic_app_icon';
import { setLocation } from '../store/slices/authSlice';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/Sheet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const Header = () => {
  const [Logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const LoggedUser = () => setLogged(!Logged);
  const dispatch = useDispatch();

  // https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.58540&lng=73.71410&collection=83631

  // category type

  const state = useSelector((state) => state.cart.items);
  const city = useSelector((state) => state.auth.city);
  console.log('custom logger [state2]', city);

  const FetchLocation = (event) => {
    const data = JSON.parse(event.target.value);
    console.log('custom logger [data]', data);
    dispatch(setLocation(data));
  };

  return (
    <>
      <header className="flex sticky top-0 z-40 justify-between items-center px-24 py-5 shadow-xl bg-slate-100">
        <div className="flex gap-20">
          <Link to="/">
            <AppIcon size={30} />
          </Link>
          <div onClick={setOpen}>Select {city}</div>
        </div>

        <div className="hidden nav-items md:block">
          <ul>
            <li className="flex gap-3 items-center">
              <IoSearch size={20} />
              <Link to="/search">Search</Link>
            </li>
            <li className="flex gap-3 items-center">
              <TbDiscount size={20} />
              <Link to="/about">Offers</Link>
            </li>
            <li className="flex gap-3 items-center">
              <GrContactInfo size={20} />
              <Link to="/contact">Help</Link>
            </li>
            <li className="flex gap-3 items-center">
              <BsCart size={20} />
              <Link to="/cart"> Cart - {state?.length} Items</Link>
            </li>
            {Logged ? (
              <button onClick={LoggedUser}>Logout</button>
            ) : (
              <button onClick={LoggedUser}>Login</button>
            )}
          </ul>
        </div>
      </header>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="bg-white w-[85vw] sm:w-[400px] h-full shadow-lg px-6 py-4 overflow-y-auto animate-in slide-in-from-left duration-300">
          <SheetClose asChild></SheetClose>

          <h2 className="mt-8 text-xl font-semibold">Select your city</h2>

          <select
            onChange={(e) => {
              FetchLocation(e);
              setOpen(false); // Close the sheet after selection
            }}
            className="px-4 py-2 mt-6 w-full text-gray-700 rounded-xl border border-gray-300 outline-none">
            <option value="">----- Select City -----</option>
            {StateList.map((data, index) => (
              <option
                key={index}
                value={JSON.stringify({
                  lng: data.lng,
                  lat: data.lat,
                  city: data.city,
                })}>
                {data.city}
              </option>
            ))}
          </select>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetClose asChild>
            <div>
              <div className="flex gap-3 items-center">
                <IoSearch size={20} />
                <Link to="/search">Search</Link>
              </div>
              <div className="flex gap-3 items-center">
                <TbDiscount size={20} />
                <Link to="/about">Offers</Link>
              </div>
              <div className="flex gap-3 items-center">
                <GrContactInfo size={20} />
                <Link to="/contact">Help</Link>
              </div>
              <div className="flex gap-3 items-center">
                <BsCart size={20} />
                <Link to="/cart"> Cart - {state?.length} Items</Link>
              </div>
              {Logged ? (
                <button onClick={LoggedUser}>Logout</button>
              ) : (
                <button onClick={LoggedUser}>Login</button>
              )}
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
