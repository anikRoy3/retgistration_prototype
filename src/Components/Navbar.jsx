import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { contextProvider } from '../Context/Provider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { email, setEmail, cart, user, setCart, setKey, key } = useContext(contextProvider)
  let count = 0
  const values = cart ? Object.values(JSON.parse(cart)) : 0
  if (values) {
    for (let v of values) {
      count += v
    }
  }
  const wishtlistsCount = JSON.parse(localStorage.getItem('wishlists'))?.length
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you want to logout ',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No.',
      showCancelButton: true,
      showCloseButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem('userId');
        setCart(localStorage.removeItem('cartItems'))
        setEmail('')
        navigate('/login')
      }
    })

  }




  return (
    <nav className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 px-4 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-2xl uppercase">
          <Link to={'/'}>Cool Shop</Link>
        </div>

        {/* Search bar  */}
        {(pathname.includes('/products') || pathname.includes('/searchResult')) && <div className="flex items-center md:px-8">
          < div className="relative flex-grow" >
            <input
              type="text"
              className="lg:w-96 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500 pl-12"
              placeholder="Search products"
              onChange={(e) => setKey(e.target.value)}
            />
            <button
              className={`absolute ${!key ? 'btn-disabled bg-gray-300 text-gray-400' : ''}  rounded-md inset-y-0 right-0 px-3 flex items-center bg-blue-300 text-blue-600 py-0 hover:text-gray-600 transition duration-300`}

            >
              <i className='fa fa-search'></i>
            </button>
          </div>
        </div>}

        <div className="md:hidden">
          <button
            type="button"
            className="text-white hover:text-white focus:outline-none focus:text-white"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16ZM3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5V4ZM3 9C3 8.44772 3.44772 8 4 8H20C20.5523 8 21 8.44772 21 9V10C21 10.5523 20.5523 11 20 11H4C3.44772 11 3 10.5523 3 10V9ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14V15C21 15.5523 20.5523 16 20 16H4C3.44772 16 3 15.5523 3 15V14Z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-white transition duration-300"
          >
            Home
          </Link>

          {
            email ? <>

              <p onClick={handleLogout} className='text-gray-200 cursor-pointer hover:text-gray-300'>Logout <i className="fas fa-sign-out-alt"></i> </p>
            </> : <>
              <Link
                to="/signup"
                className="text-white hover:text-white transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="login"
                className="text-white hover:text-white transition duration-300"
              >
                Login
              </Link>
            </>
          }
          {email && <Link to="/orderHistory" className="text-white hover:text-white transition duration-300">
            Order History {/* ৳ */}
          </Link>}

          {user?.role !== 'admin' && <Link to="/cart" className="text-white hover:text-white transition duration-300">
            <span className="relative inline-block">
              <i className="fas fa-shopping-cart ml-1 mr-2"></i>
              <span className="bg-red-500 rounded-full text-white text-xs absolute -top-1 -right-1 px-1">
                {count}
              </span>
            </span>
          </Link>}
          {email && <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.imageUrl} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to={'/userInfo'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                {
                  email && <Link to={'/wishlists'}>  My Wishlists ({wishtlistsCount})</Link>
                }
              </li>
            </ul>
          </div>}
        </div>
      </div >

      {isMenuOpen && (
        <div className="md:hidden mt-3">
          <a
            href="#home"
            className="block text-white hover:text-white py-1 transition duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="block text-white hover:text-white py-1 transition duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="block text-white hover:text-white py-1 transition duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="block text-white hover:text-white py-1 transition duration-300"
          >
            Contact
          </a>
        </div>
      )}
    </nav >
  );
};

export default Navbar;
