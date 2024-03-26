import { User as FirebaseUser } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/cart';
import AddIcon from './ui/icons/AddIcon';
import CartIcon from './ui/icons/CartIcon';
import SideNavBar from './ui/SidNavBar/SideNavBar';

export type User = FirebaseUser & { isAdmin?: boolean };

export default function Header() {
  const location = useLocation();
  const { user, signin, signout } = useAuthContext();
  const { items } = useCart(user?.uid ?? '');
  const [nav, setNav] = useState<'SHOP' | 'ABOUT' | undefined>(undefined);

  const handleCloseNav = () => {
    setNav(undefined);
  };

  useEffect(() => {
    setNav(undefined);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-0  px-10 flex items-center h-[100px] z-10 ${
        nav && 'bg-white'
      }`}
    >
      <div className='basis-1/5'>
        <button onClick={() => setNav('SHOP')}>SHOP</button>
      </div>
      <Link to='/' className='basis-3/5 m-auto'>
        <img src='/logo.svg' alt='logo' className='m-auto' />
      </Link>
      <div className='basis-1/5 flex justify-end gap-5'>
        {user?.isAdmin && (
          <Link to='/add'>
            <AddIcon />
          </Link>
        )}
        {user && (
          <Link to='/cart' className='relative pr-1'>
            <CartIcon />
            <div className='absolute top-0 right-0 w-3 h-3 bg-black rounded-full text-white text-[0.55rem] text-center font-bold'>
              {items?.length}
            </div>
          </Link>
        )}
        <button onClick={() => setNav('ABOUT')}>ABOUT</button>
      </div>

      {/* SideBar_SHOP */}
      <SideNavBar
        position='left'
        onClose={handleCloseNav}
        open={nav === 'SHOP'}
      >
        <li>
          <Link to='/products'>ALL</Link>
        </li>
        <li>
          <Link to='/products/bag'>BAG</Link>
        </li>
        <li>
          <Link to='/products/shoes'>SHOES</Link>
        </li>
        <li>
          <Link to='/products/wallet'>WALLET</Link>
        </li>
      </SideNavBar>

      {/* SideBar_ABOUT */}
      <SideNavBar
        position='right'
        onClose={handleCloseNav}
        open={nav === 'ABOUT'}
      >
        <p className='mb-10 text-end font-semibold'>
          {user?.displayName ?? 'CUSTOMER'}
        </p>
        <li>
          {user ? (
            <button onClick={() => signout(() => setNav(undefined))}>
              LOGOUT
            </button>
          ) : (
            <button onClick={() => signin(() => setNav(undefined))}>
              LOGIN
            </button>
          )}
        </li>
        {user && (
          <li>
            <Link to='/cart'>CART</Link>
          </li>
        )}
        {user?.isAdmin && (
          <li>
            <Link to='/add'>ADD PRODUCT</Link>
          </li>
        )}
      </SideNavBar>
    </header>
  );
}
