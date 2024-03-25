import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/products';

export default function Products() {
  const { category } = useParams();
  const { products, isLoading, error } = useProducts(category);

  return (
    <section className='max-w-screen-lg m-auto pt-[100px]'>
      {products && <ProductGrid products={products} />}
    </section>
  );
}
