import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'


const OrderProductDetails = ({ itemId, quantity }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on itemId
    fetch(`http://localhost:5000/products/${itemId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [itemId])

  // console.log(product)
  if (!product) {
    return <></>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-md">
      {/* Left Section - Product Image */}
      <motion.div
        className="w-full md:w-1/2 h-64 md:h-auto bg-gray-300 rounded-lg mb-4 md:mb-0 md:mr-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={product.image} alt={product.name} className="w-40 h-36 object-cover rounded-lg" />
      </motion.div>

      {/* Right Section - Product Details */}
      <motion.div
        className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">${parseInt(product.price) - parseInt(product.discount)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <p className="text-gray-700 mb-6">Quantity: {quantity}</p>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          fdsaf
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderProductDetails;
