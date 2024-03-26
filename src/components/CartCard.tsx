import React from 'react';
import { CartItem } from '../hooks/cart';
type Props = {
  item: CartItem;
  removeItem: (item: CartItem) => void;
  changeCount: (item: CartItem, count: number) => void;
};

export default function CartCard({ item, removeItem, changeCount }: Props) {
  return (
    <div className='relative flex items-center border-t border-black py-3'>
      <img
        className='object-cover'
        width={200}
        height={200}
        src={item.image}
        alt='cart_image'
      />
      <div>
        <h1 className='font-semibold text-sm mb-4'>
          {item.name?.toLocaleLowerCase()} - {item.option}
        </h1>
        <p className='font-semibold text-sm mb-4'>
          {item.price?.toLocaleString()}원
        </p>
        <button
          className='text-sm text-zinc-600 underline underline-offset-4'
          onClick={() => removeItem(item)}
        >
          remove
        </button>
      </div>
      <div className='absolute bottom-10 right-5 flex text-sm'>
        <button
          onClick={() => {
            1 < item.count && changeCount(item, item.count - 1);
          }}
        >
          -
        </button>
        <input
          className='w-7 text-center'
          type='text'
          value={item.count}
          readOnly
        />
        <button
          onClick={() => {
            changeCount(item, item.count + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
