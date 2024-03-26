import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/products';

export default function Products() {
  const { category } = useParams();
  const { products, isLoading, error } = useProducts(category);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>error...</p>}
      <section className='max-w-screen-lg m-auto pt-[100px]'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {products?.map((product) => (
            <li key={product.id}>
              <ProductCard product={product}>
                <p className='text-lg'>{product.price.toLocaleString()}</p>
              </ProductCard>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
