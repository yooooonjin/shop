import React from 'react';
import CartCard from '../components/CartCard';
import TotalPrice from '../components/TotalPrice';
import { useAuthContext } from '../context/AuthContext';
import useCart, { CartItem } from '../hooks/cart';

const DELIVERY_CHARGE = 3000;

export default function Cart() {
  const { user } = useAuthContext();
  const { items, deleteItem, changeCount } = useCart(user?.uid ?? '');

  const handleRemoveItem = (item: CartItem) => {
    deleteItem({
      uid: user?.uid ?? '',
      ...item,
    });
  };

  const handleChangeCount = (item: CartItem, count: number) => {
    changeCount({ ...item, count, uid: user?.uid ?? '' });
  };

  const totalPrice = items?.reduce((a, b) => a + b.price * b.count, 0) ?? 0;
  return (
    <section className='mt-[130px] px-10 flex flex-col md:flex-row gap-10 mb-8'>
      <div className='w-full'>
        <ul className='relative'>
          <h1 className='absolute -top-7 mb-3 text-sm'>
            CART({items?.length ?? 0})
          </h1>
          {items?.length ? (
            items.map((item, index) => (
              <li key={`${item.id}_${index}`}>
                <CartCard
                  item={item}
                  removeItem={handleRemoveItem}
                  changeCount={handleChangeCount}
                />
              </li>
            ))
          ) : (
            <p className='text-center pt-14 mb-14'>상품이 존재하지 않습니다.</p>
          )}
        </ul>
        <div className='border-y border-black py-4 text-center text-sm'>
          구매금액{' '}
          <span className='font-semibold'>{totalPrice.toLocaleString()}</span> +
          배송비{' '}
          <span className='font-semibold'>
            {DELIVERY_CHARGE.toLocaleString()}
          </span>{' '}
          ={' '}
          <span className='font-semibold'>
            {(totalPrice + DELIVERY_CHARGE).toLocaleString()}원
          </span>
        </div>
      </div>
      <div className='w-full md:w-[40%]'>
        <TotalPrice totalPrice={totalPrice} delivery={DELIVERY_CHARGE} />
      </div>
    </section>
  );
}
