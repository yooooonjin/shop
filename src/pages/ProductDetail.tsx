import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/product';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/cart';

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (id) return getProductById(id);
    },
    staleTime: 1000 * 60 * 10,
  });

  const { user } = useAuthContext();
  const [option, setOption] = useState<string>();
  const { addItem } = useCart(user?.uid ?? '');

  const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setOption(e.currentTarget.value);
  };

  const handleAddCart = async () => {
    if (!id || !product) return;
    if (user) {
      if (option) {
        const { options, description, ...updateItem } = product;
        addItem({ uid: user.uid, option, count: 1, ...updateItem });
      } else {
        alert('옵션을 선택해 주세요.');
      }
    } else {
      alert('로그인 후 이용해 주세요.');
    }
  };

  useEffect(() => {
    if (product && product?.options[0]) setOption(product.options[0]);
  }, [product]);

  if (!product || isLoading) return <></>;
  const { image, name, price, description, category, options } = product;
  return (
    <section className='max-w-screen-lg m-auto flex flex-col md:flex-row mt-[130px] px-5'>
      <div className='basis-1/2 m-auto'>
        <img src={image} alt='product_image' />
      </div>
      <div className='basis-1/2 flex flex-col text-center md:text-start'>
        <article className='mb-10'>
          <p className='mb-5'>{category}</p>
          <h1 className='text-lg mb-7'>{name}</h1>
          <p className='text-2xl mb-7'>{price.toLocaleString()}</p>
          <select
            className='mb-7'
            name='option'
            id='option'
            value={option}
            onChange={handleOption}
          >
            {options.map((option, index) => (
              <option key={`option_${option}_${index}`} value={option}>
                {option}
              </option>
            ))}
          </select>
          <pre className='text-wrap text-xs leading-7'>{description}</pre>
        </article>
        <div className='h-10 px-5'>
          <Button text='CART' onClick={handleAddCart} />
        </div>
      </div>
    </section>
  );
}
