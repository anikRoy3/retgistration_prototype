import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
// import video from '../assets/vOne.mp4'
// import video1 from '../assets/vOne.mp4'
// import video2 from '../assets/vTwo.mp4'
import video3 from '../assets/vThree.mp4'
// import video4 from '../assets/vFour.mp4'
// import video5 from '../assets/vFive.mp4'
// import video6 from '../assets/vSix.mp4'
const Home = () => {
    /* useEffect(() => {
        setupThreeJsBackground();
      }, []); */
    return (

        <>
            <div className="min-h-screen bg-gray-100">
                {/* Hero Section */}
                <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        autoPlay
                        muted
                        loop
                    >
                        <source src={video3} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="p-8 rounded-lg bg-opacity-70 backdrop-blur-md backdrop-filter text-white text-center relative z-10">
                        <h1 className="text-5xl font-bold mb-8">Welcome to Fancy Shop</h1>
                        <p className="text-xl mb-8">Discover our amazing products.</p>
                        <Link to={'/products'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded shadow-lg">
                            Explore Products
                        </Link>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        repeat: Infinity, // Repeat the animation indefinitely
                        repeatType: 'reverse', // Reverse the animation on each repeat
                        duration: 1, // Animation duration (seconds)
                    }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-lg shadow-lg text-white"
                >
                    <div className="flex items-center">
                        <span className="text-4xl font-bold mr-2">25%</span>
                        <div className="flex flex-col">
                            <span className="font-semibold uppercase">Discount</span>
                            <span className="text-xs">Limited Time Offer</span>
                        </div>
                    </div>
                    <p className="text-xs mt-2">
                        Use the code <span className="font-bold">SUMMER25</span> at checkout
                    </p>
                </motion.div>
                {/* Testimonials Section */}
                <div className="bg-gradient-to-b from-purple-700 to-purple-400">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-4xl font-bold text-white">Testimonials</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                                    <p className="text-xl text-gray-900 mb-2">
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisi non justo
                                        ullamcorper posuere id sit amet ligula."
                                    </p>
                                    <p className="text-gray-600">- John Doe</p>
                                </div>
                                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                                    <p className="text-xl text-gray-900 mb-2">
                                        "Aenean euismod bibendum laoreet. Nulla sit amet ex at dui venenatis
                                        ultrices vel vitae turpis."
                                    </p>
                                    <p className="text-gray-600">- Jane Smith</p>
                                </div>
                                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                                    <p className="text-xl text-gray-900 mb-2">
                                        "Fusce in semper velit, vel pharetra nisl. Sed vel odio vitae purus
                                        suscipit euismod."
                                    </p>
                                    <p className="text-gray-600">- Michael Johnson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-gray-200">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
                            <p className="mt-4 text-xl text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
