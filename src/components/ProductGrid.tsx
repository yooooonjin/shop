import React from 'react';
import { Product } from '../pages/AddProducts';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <section>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product}>
              <p className='text-lg'>{product.price.toLocaleString()}</p>
            </ProductCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
