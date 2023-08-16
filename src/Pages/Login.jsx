import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/Provider';
import ForgotPassword from '../Components/Utils/ForgotPassword';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { setEmail } = useContext(contextProvider);
  const [way, setWay] = useState('')
  const location = useLocation()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';
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
          navigate((from.cartUrl || from.pathname || from), { replace: true })
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputBlur = (field) => () => {
    trigger(field);
  };

  const handleForgotPassword = (way) => {
    const forgot_password = document.getElementById('forgot_password')
    forgot_password.showModal()
    setWay(way)
  }
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  }
                })}
                onBlur={handleInputBlur('password')}
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 7.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 10.586l2.293-2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 4a6 6 0 016 6c0 .852-.176 1.657-.488 2.387l1.56 1.56A8 8 0 0020 10a8 8 0 10-2.829 5.657l1.414 1.414A10 10 0 0120 10a10 10 0 01-17.316-7.079L5.93 6.473A6 6 0 0110 4zm0 2a4 4 0 00-4 4c0 1.466.64 2.787 1.658 3.693l1.414 1.414C9.347 15.59 9 14.847 9 14a3 3 0 013-3c.847 0 1.59.347 2.107.902l1.473 1.473C14.787 11.361 14 9.804 14 8a4 4 0 00-4-4zm0 7a3 3 0 11.001-5.999A3 3 0 0110 13z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <div>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
          </div>
          <h2 onClick={() => (handleForgotPassword('link'))} className=" text-blue-500 mb-4 cursor-pointer hover:text-blue-800">Forgot Password By Link?</h2>
          <h2 onClick={() => (handleForgotPassword('otp'))} className=" text-blue-500 mb-4 cursor-pointer hover:text-blue-800">Forgot Password by Otp?</h2>
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
      <ForgotPassword way={way} handleForgotPassword={handleForgotPassword}/>
    </div>
  );
};

export default LoginPage;
