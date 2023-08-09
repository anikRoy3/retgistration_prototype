import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contextProvider } from '../Context/Provider';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const CartPage = () => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { setCart } = useContext(contextProvider)
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')));
  console.log('cartItems', cartItems)
  useEffect(() => {
    const fetchData = async () => {
      // if()
      if (cartItems) {
        if (Object.keys(cartItems).length > 0) {
          setLoading(true);
          const itemIds = Object.keys(cartItems);
          const fetchedProducts = await Promise.all(itemIds.map(id => fetchProduct(id)));
          setProducts(fetchedProducts);
          setLoading(false);
        } else {
          setProducts([]);
        }
      }
    };

    fetchData();
  }, [cartItems]);

  const fetchProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const data = await response.json();
    return data.data;
  };

  // Handle delete item from cart
  const handleDeleteItem = (id) => {
    const isConfirm = window.confirm('Are you want to sure delete?');
    if (isConfirm) {
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[id];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
      setCart(JSON.stringify(updatedCartItems))

    }
  };

  // calculate the total price 
  const calculateTotal = (products) => {
    return products.reduce((acc, curr) => {
      console.log(cartItems[curr._id])
      const totalPrice = parseInt(curr.price) - parseInt(curr.discount);
      console.log()
      acc += (totalPrice * cartItems[curr._id])
      return acc;
    }, 0);
  };


  //handleDecreaseQuantity
  const handleDecreaseQuantity = (_id) => {
    if (cartItems[_id] <= 1) {
      toast.error('Invalid quantity!!')
      return;
    }
    const updatedItem = {
      ...cartItems,
      [_id]: cartItems[_id] - 1
    };
    localStorage.setItem('cartItems', JSON.stringify(updatedItem));
    setCartItems(updatedItem);
    setCart(JSON.stringify(updatedItem))
  }

  //handleIncreaseQuantity
  const handleIncreaseQuantity = (_id) => {
    if (cartItems[_id] <= 0) {
      toast.error('Invalid quantity!!')
      return;
    }
    const updatedItem = {
      ...cartItems,
      [_id]: cartItems[_id] + 1
    };
    localStorage.setItem('cartItems', JSON.stringify(updatedItem));
    setCartItems(updatedItem);
    setCart(JSON.stringify(updatedItem))
  }
  console.log(products)

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {products.length > 0 && products?.map(item => (
            <motion.div
              key={item._id}
              className="bg-white p-4 shadow mb-4 rounded-md  flex"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-gray-200 rounded-md mr-4">
                <img src={item?.image} alt="" />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item?.name}</h3>
                <p className="text-gray-600">${parseInt(item?.price) - parseInt(item.discount)}</p>
                <p className="text-gray-600">Quantity: {cartItems[item?._id]}</p>
              </div>
              <div className='flex flex-1 justify-between'>

                <div className="flex items-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
                    onClick={() => handleDecreaseQuantity(item?._id)}
                  >
                    -
                  </button>
                  <p className="text-gray-600"> {cartItems[item?._id]}</p>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-md"
                    onClick={() => handleIncreaseQuantity(item?._id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteItem(item?._id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {products.length > 0 ? <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white p-4 shadow rounded-md flex justify-between items-center">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">${calculateTotal(products)}</p>
            <motion.button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={'/checkout'}>Proceed to Checkout</Link>
            </motion.button>
          </div>
        </motion.div> : <div className="flex flex-col items-center justify-center">
          <motion.img
            src="https://www.ipharmascience.com/assets/img/webimg/emptycart.png" // Replace with your fancy image URL
            alt="No Content"
            className="w-40 h-40 rounded-full shadow-lg mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h2
            className="text-2xl font-bold text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No Item Here...
          </motion.h2>
          <motion.button
            className="bg-blue-500 mt-3 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to='/products'>Go for Products</Link>
          </motion.button>
        </div>}
      </div>
    </div>
  );
};



export default CartPage;
