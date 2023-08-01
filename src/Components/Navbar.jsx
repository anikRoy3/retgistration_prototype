import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contextProvider } from '../Context/Provider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { email, setEmail } = useContext(contextProvider)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log('email from navbar', email)

  const handleLogout = () => {
    const isConfirm = window.confirm("Are you want to logout sure?");
    console.log('isConfirm', isConfirm)
    if (isConfirm) localStorage.removeItem('userId');
    setEmail('')
  }
  console.log(email)
  return (
    <nav className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to={'/'}>Registration Prototype</Link>
        </div>
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
            email ? <p onClick={handleLogout} className='text-gray-200 cursor-pointer hover:text-gray-300'>Logout <i className="fas fa-sign-out-alt"></i> <Link
              to="userInfo"
              className="text-white hover:text-white transition duration-300"
            >
              My Profile
            </Link></p> : <>
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
        </div>
      </div>

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
    </nav>
  );
};

export default Navbar;
