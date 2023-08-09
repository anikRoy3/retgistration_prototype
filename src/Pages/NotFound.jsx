import React from 'react';
import { Link } from 'react-router-dom';
// import notFoundImage from '../assets/not-found.png';

const NotFound = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <img
                src={'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=2000'}
                alt="Not Found"
                className="w-64 h-64 rounded-full shadow-lg mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-4">The page you are looking for does not exist.</p>
            <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
