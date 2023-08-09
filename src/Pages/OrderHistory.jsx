import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../Context/Provider';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrderProductDetails from '../Components/OrderProductDeatils';


const OrderHistoryPage = () => {


  const { email } = useContext(contextProvider);
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    if (email) {
      const url = `http://localhost:5000/myorder?email=${email}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setOrders(data.order);
          setLoading(false); // Move this line here
        });
    }else{
      setLoading(false)
    }
    // Remove setLoading(false) from here
  }, [email]);
// console.log(first)
  if (loading) return <Loading />
  console.log(orders)
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>
      {orders?.length > 0 ? (
        orders?.map((order, index) => (
          <div
            key={order._id}
            className={`bg-white p-6 shadow rounded-lg mb-6 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-gray-100'
              }`}
          >
            <p className="text-gray-500 mb-2">Transaction ID: {order.transactionId}</p>
            <h3 className="text-lg font-semibold mb-2">Name: {order.name}</h3>
            <p className="text-gray-600 mb-2">Email: {order.email}</p>
            <p className="text-gray-600 mb-2">Phone: {order.phone}</p>
            <p className="text-gray-600 mb-2">Address: {order.address}</p>
            <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>
            <p className="text-gray-600 mb-2">Paid: {order.paid ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 mb-2">
              Paid At: {new Date(order.paidAt).toLocaleString()}
            </p>
            <ul className="pl-8 list-disc">
              {Object.entries(order.itemsQuantity).map(([itemId, quantity]) => (
                <OrderProductDetails key={itemId} itemId={itemId} quantity={quantity}/>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <motion.img
            src="https://cdn.dribbble.com/users/1555425/screenshots/4811660/no_order_found.jpg"
            alt="No Order Found"
            className="w-32 h-32 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-gray-600 text-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            No orders found.
          </motion.p>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/products"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Browse Products
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
