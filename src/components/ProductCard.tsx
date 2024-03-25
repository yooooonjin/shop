import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../pages/AddProducts';

type Props = {
  product: Product;
  children?: React.ReactNode;
};

export default function ProductCard({
  product: { name, options, image, id },
  children,
}: Props) {
  return (
    <Link to={`/product/${id}`} className='flex flex-col items-center mb-10'>
      <img alt='product' src={image} />
      <h1 className='text-zinc-700 font-medium mb-2'>{name}</h1>
      <p className='text-zinc-700 text-xs text-center mb-3'>
        {options.join(', ')}
      </p>
      {children}
    </Link>
  );
}
