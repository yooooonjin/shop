import React, { FormEvent, useState } from 'react';
import { addNewProduct } from '../api/product';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

const INPUT_CLASSNAME = 'w-full border p-3 mb-2 focus:outline-none';

export type AddProduct = Omit<Product, 'options' | 'image' | 'id' | 'price'> & {
  options: string;
  price: string;
};

export type Product = {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  description: string;
  options: string[];
};

const initalProduct = {
  name: '',
  price: '',
  category: '',
  description: '',
  options: '',
};

export default function AddProducts() {
  const [file, setFile] = useState<File | null>(null);
  const [product, setProduct] = useState<AddProduct>(initalProduct);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      const result = await uploadImage(file);
      await addNewProduct(product, result.data.url);
      setProduct(initalProduct);
      setFile(null);
    }
  };

  return (
    <section className='max-w-screen-md m-auto mt-[100px]'>
      <h1 className='text-lg font-bold text-center mb-5'>새로운 제품 등록</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-5'>
          <input
            required
            type='file'
            name='file'
            id='file'
            className='hidden'
            onChange={handleImageUpload}
          />
          <label
            htmlFor='file'
            className={`inline-block ${INPUT_CLASSNAME} border-dotted border-2 text-center`}
          >
            제품 이미지 업로드
            {file ? (
              <span className='font-semibold'> [ {file.name} ]</span>
            ) : (
              ''
            )}
          </label>
          {file && (
            <div className='flex justify-center mb-2'>
              <img
                src={URL.createObjectURL(file)}
                className='max-w-screen-sm'
              />
            </div>
          )}
          <input
            required
            className={INPUT_CLASSNAME}
            type='text'
            placeholder='제품명'
            id='name'
            name='name'
            value={product.name}
            onChange={handleChange}
          />
          <input
            required
            className={INPUT_CLASSNAME}
            type='number'
            placeholder='가격'
            id='price'
            name='price'
            value={product.price}
            onChange={handleChange}
          />
          <input
            required
            className={INPUT_CLASSNAME}
            type='text'
            placeholder='카테고리'
            id='category'
            name='category'
            value={product.category}
            onChange={handleChange}
          />
          <textarea
            required
            className={INPUT_CLASSNAME}
            placeholder='제품설명'
            id='description'
            name='description'
            rows={5}
            value={product.description}
            onChange={handleChange}
          />
          <input
            required
            className={INPUT_CLASSNAME}
            type='text'
            placeholder='옵션들(콤마(,)로 구분)'
            id='options'
            name='options'
            value={product.options}
            onChange={handleChange}
          />
        </div>
        <div className='h-10'>
          <Button text='제품 등록하기' />
        </div>
      </form>
    </section>
  );
}
