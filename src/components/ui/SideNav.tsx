import React from 'react';
import { User } from '../Header';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  position: 'right' | 'left';
};

export default function SideNav({ onClose, position, children }: Props) {
  return (
    <section
      className='fixed top-[100px] left-0 h-[100vh] w-[100vw] bg-black/5'
      onClick={(e) => {
        e.currentTarget === e.target && onClose();
      }}
    >
      <nav
        className={`h-full w-[30%] bg-side py-12 px-14 ${
          position == 'right' && 'ml-auto'
        }`}
      >
        <ul className='text-lg flex flex-col gap-3'>{children}</ul>
      </nav>
    </section>
  );
}
