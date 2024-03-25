import { Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
import { Product } from '../pages/AddProducts';
import 'swiper/css';
import 'swiper/css/scrollbar';

type Props = {
  items: Product[];
};

export default function SwiperSlider({ items }: Props) {
  return (
    <Swiper
      modules={[Scrollbar, A11y]}
      slidesPerView={2}
      scrollbar={{ draggable: true }}
      loop
    >
      {items.map((item, index) => (
        <SwiperSlide key={item.id}>
          <ProductCard product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
