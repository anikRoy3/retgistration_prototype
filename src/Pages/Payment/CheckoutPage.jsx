import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { contextProvider } from '../../Context/Provider';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const {
    handleSubmit,
    register,
    setValue, // Add setValue from react-hook-form
    formState: { errors },
  } = useForm();
  const { user } = useContext(contextProvider);

  const currencies = ['USD', 'EUR', 'GBP', 'BDT'];
  const countries = ['USA', 'Canada', 'UK', 'Bangladesh'];
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { setCart } = useContext(contextProvider)
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')));

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(cartItems).length > 0) {
        setLoading(true);
        const itemIds = Object.keys(cartItems);
        const fetchedProducts = await Promise.all(itemIds.map(id => fetchProduct(id)));
        setProducts(fetchedProducts);
        setLoading(false);
      } else {
        setProducts([]);
      }
    };

    fetchData();
  }, [cartItems]);
  // calculate the total price 
  const calculateTotal = (products) => {
    return products.reduce((acc, curr) => {
      const totalPrice = parseInt(curr.price) - parseInt(curr.discount);
      acc += (totalPrice * cartItems[curr._id])
      return acc;
    }, 0);
  };
  const fetchProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const data = await response.json();
    return data.data;
  };

  const onSubmit = (data) => {
    data.name = user?.name;
    data.email = user?.email;
    data.phone = user?.phone
    data.totalPrice = parseInt(calculateTotal(products))
    data.itemsQuantity = cartItems
    console.log(data);
    fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.location.replace(data.url);
        } else {
          toast.error('Soemthing occurs happened!!')
        }
        console.log(data)
      })

  };

  // Set default value for countryCode on component mount
  useEffect(() => {
    setValue('countryCode', countries[3]); // Auto-select Bangladesh as default
  }, [setValue, countries]);

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600">Checkout Page</h1>
        <p className="text-gray-500 mt-2 font-bold text-lg md:text-xl">Complete your purchase and enjoy your new items!</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 py-16 px-8">
        {/* Left Section - Product Details */}
        <div className='w-1/2'>
          {
            products.map(item => (
              <motion.div
                key={item._id}
                className="bg-white p-4 shadow mb-4 rounded-md  flex flex-col md:flex-row"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full md:w-1/4 h-40 md:h-auto bg-gray-200 rounded-md mb-4 md:mb-0 md:mr-4">
                  <img src={item.image} alt="" className="w-full h-full object-cover rounded-md" />
                </div>

                <div className="flex-grow md:w-2/4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${parseInt(item.price) - parseInt(item.discount)}</p>
                  <p className="text-gray-600">Quantity: {cartItems[item._id]}</p>
                </div>

              </motion.div>
            ))
          }
          <div className="bg-white p-4 shadow rounded-md flex justify-between items-center">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">${calculateTotal(products)}</p>

          </div>

        </div>

        {/* Right Section - Checkout Form */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-auto lg:w-1/2 p-3 bg-white rounded-lg shadow-md mt-4 lg:mt-0"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label>Name:</label>
              <input className="input input-bordered w-full" disabled readOnly value={user?.name} />
            </div>
            <div className="mb-4">
              <label>Email:</label>
              <input className="input input-bordered w-full" readOnly disabled value={user?.email} />
            </div>
            <div className="mb-4">
              <label>Postcode:</label>
              <input {...register("postcode", { required: 'Postcode is required' })} type="number" className="input input-bordered w-full" />
              {errors.postcode && <p className="text-red-500">{errors.postcode.message}</p>}
            </div>
            <div className="mb-4">
              <label className='block'>Currency:</label>
              <select {...register("currency", { required: 'Currency is required' })} defaultValue={'BDT'} className="select select-bordered w-full p-2 border rounded-lg">
                <option disabled>Select your currency?</option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
              {errors.currency && <p className="text-red-500">{errors.currency.message}</p>}
            </div>
            <div className="mb-4">
              <label>Address:</label>
              <input {...register("address", { required: 'Address is required' })} className="input input-bordered w-full" />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>
            <div className="mb-4">
              <label className='block'>Ship Country:</label>
              <select {...register("ship_country", { required: 'Ship country is required' })} defaultValue={'Bangladesh'} className="select select-bordered w-full p-2 border rounded-lg">
                <option disabled>Select your ship country?</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.ship_country && <p className="text-red-500">{errors.ship_country.message}</p>}
            </div>
            <div className="mb-4">
              <label>Phone:</label>
              <input className="input input-bordered w-full" readOnly disabled value={user?.phone} />
            </div>

            <input type="submit" className="bg-blue-500 uppercase  w-full text-white px-4 py-2 rounded-lg"
              value={'Purchase'}
            />
          </form>
        </motion.div>
      </div>

    </>
  );
};

export default CheckoutPage;
