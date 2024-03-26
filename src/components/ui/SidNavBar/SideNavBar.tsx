import React from 'react';
import styles from './SideNavBar.module.css';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  position: 'right' | 'left';
  open: boolean;
};

export default function SideNavBar({
  onClose,
  position,
  children,
  open,
}: Props) {
  return (
    <section
      className={`${open && styles.open} ${styles.side_bar_container}`}
      onClick={(e) => {
        e.currentTarget === e.target && onClose();
      }}
    >
      <nav
        className={`absolute h-full w-[30%] bg-side py-12 px-14 ${styles[position]}`}
      >
        <ul className='text-lg flex flex-col gap-3'>{children}</ul>
      </nav>
    </section>
  );
}
