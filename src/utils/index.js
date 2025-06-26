import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

export const TotalPrice = () => {
  const Cart = useSelector((state) => state.cart.items);

  const total = Cart.reduce((data, index) => {
    return (data += index.item.price
      ? (index.item.price / 100) * index.count
      : (index.item.defaultPrice / 100) * index.count);
  }, 0);

  return total;
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
