import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/product';
import ProductCard from '../components/ProductCard';
import SwiperSlider from '../components/SwiperSlider';
import { useProducts } from '../hooks/products';

export default function Home() {
  const { products, isLoading, error } = useProducts();

  return (
    <section>
      <Link to='/products' className='h-[100vh] w-full inline-block'>
        <img
          className='object-cover w-full h-full'
          src='https://minitmute.com/web/mainSlide/24ss1.jpeg'
          alt='banner'
        />
      </Link>
      <section className='max-w-screen-lg m-auto'>
        {products && <SwiperSlider items={products} />}
      </section>
    </section>
  );
}
