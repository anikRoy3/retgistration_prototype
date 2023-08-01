import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/Provider';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { setEmail } = useContext(contextProvider)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const onSubmit = data => {
    console.log(data);
    fetch('http://localhost:5000/login', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        if (data.status > 200) {
          setErrorMessage(data.message)
        } else {
          localStorage.setItem('userId', data.data._id)
          setEmail(data.data.email)
          setErrorMessage('')
          navigate('/')
        } 
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit(onSubmit)}        >
          <h2 className="text-3xl font-bold text-center mb-4">Welcome Back!</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && <span className='text-red-400'>This field is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password', { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && <span className='text-red-400'>This field is required</span>}
          </div>
          <div>
            {
              errorMessage ? <p className='py-3 text-red-500'>{errorMessage} </p> : ''
            }
          </div>
          <div>
            <p className='py-4'>Haven't any account? <Link className='text-blue-400' to={'/signup'}>Signup</Link></p>
          </div>
          <input
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            value={'Sign in'}
          />
        </motion.form>
      </div>
    </div>
  );
};

export default LoginPage;
