import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const { image, name, description, price, discount, ratings } = product;
    const discountPercentage = (parseInt(discount) / parseInt(price) * 100).toFixed(2);
    const updatedPrice = parseInt(price) - parseInt(discount)
    const [loading, setLaoding] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        setLaoding(true)
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.data);
                setLaoding(false)
            })
    }, [])
    if (loading) return <Loading />

    return (
        <>
            <motion.div
                className=" bg-white rounded-lg shadow-lg overflow-hidden p-6 w-full h-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mt-4">
                    <Link to={'/products'} className="text-blue-500 btn btn-sm mb-6 underline hover:text-blue-700 transition">
                        Back to Products
                    </Link>
                </div>

                <section className="flex flex-col md:flex-row">
                    <div className="mb-4 md:mb-0 md:mr-6">
                        <img
                            src={
                                !image
                                    ? 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w='
                                    : image
                            }
                            alt="EleganceWatch"
                            className="w-full max-w-md rounded-lg"
                        />
                    </div>
                    <div className="">
                        <div className="text-2xl font-semibold mb-2">{name}</div>
                        <p className="text-gray-600 mb-4">{description}</p>
                        <div className=''>
                            {
                                new Array(ratings).fill(null).map((_, index) => (
                                    <i key={index} className='fa fa-star text-yellow-400'></i>
                                ))
                            }
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-3xl font-bold py-2">
                                <p className="text-lg font-semibold text-green-600">
                                    {parseInt(discount) ? (
                                        <span>
                                            {updatedPrice}$ <del>{price}$</del>
                                        </span>
                                    ) : (
                                        <span>{price}$</span>
                                    )}
                                </p>
                                <div className="text-green-600 font-bold">
                                    {discountPercentage}% OFF
                                </div>
                            </div>
                        </div>
                        {/*  <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Add to Cart
                        </motion.button> */}
                    </div>
                </section>
            </motion.div>
        </>
    );
};

export default ProductDetails;
