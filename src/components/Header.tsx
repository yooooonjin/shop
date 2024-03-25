import { User as FirebaseUser } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuthState, signin, signout } from '../api/auth';
import CartIcon from './ui/icons/CartIcon';
import SideNav from './ui/SideNav';

export type User = FirebaseUser & { isAdmin?: boolean };

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [nav, setNav] = useState<'SHOP' | 'ABOUT' | undefined>(undefined);

  const handleSingin = () => {
    setNav(undefined);
    signin().then(setUser);
  };
  const handleSingout = () => {
    setNav(undefined);
    signout().then(() => setUser(null));
  };

  const handleCloseNav = () => {
    setNav(undefined);
  };

  useEffect(() => {
    getAuthState(setUser);
  }, []);

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
        <img src='logo.svg' alt='logo' className='m-auto' />
      </Link>
      <div className='basis-1/5 flex justify-end gap-5'>
        <Link to='/cart' className='relative pr-1'>
          <CartIcon />
          <div className='absolute top-0 right-0 w-3 h-3 bg-black rounded-full text-white text-[0.55rem] text-center font-bold'>
            2
          </div>
        </Link>
        <button onClick={() => setNav('ABOUT')}>ABOUT</button>
      </div>
      {nav && (
        <SideNav
          position={nav === 'ABOUT' ? 'right' : 'left'}
          onClose={handleCloseNav}
        >
          {nav === 'SHOP' && (
            <>
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
            </>
          )}
          {nav === 'ABOUT' && (
            <>
              <p className='mb-10 text-end font-semibold'>
                {user?.displayName ?? 'CUSTOMER'}
              </p>
              <li>
                {user ? (
                  <button onClick={handleSingout}>LOGOUT</button>
                ) : (
                  <button onClick={handleSingin}>LOGIN</button>
                )}
              </li>
              <li>
                <Link to='/order'>CART</Link>
              </li>
              {user?.isAdmin && (
                <li>
                  <Link to='/add'>ADD PRODUCT</Link>
                </li>
              )}
            </>
          )}
        </SideNav>
      )}
    </header>
  );
}
