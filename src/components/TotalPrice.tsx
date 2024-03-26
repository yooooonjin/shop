type Props = {
  totalPrice: number;
  delivery: number;
};
export default function TotalPrice({ totalPrice, delivery }: Props) {
  return (
    <ul className='border-b border-black'>
      <li className='border-t border-black'>
        <h1 className='text-sm py-5'>배송비</h1>
        <p className='text-lg text-end font-semibold pb-5'>3,000원</p>
      </li>
      <li className='border-t border-black'>
        <h1 className='text-sm py-5'>총 상품금액</h1>
        <p className='text-lg text-end font-semibold pb-5'>
          {totalPrice.toLocaleString()}원
        </p>
      </li>
      <li className='border-t border-black'>
        <h1 className='text-sm py-5'>TOTAL</h1>
        <p className='text-lg text-end font-semibold pb-5'>
          {(totalPrice + delivery).toLocaleString()}원
        </p>
      </li>
    </ul>
  );
}
