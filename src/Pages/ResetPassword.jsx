import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showNPassword, setShowNPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [psError, setPsError] = useState('');
  const { id } = useParams();
  const toggleNPasswordVisibility = () => {
    setShowNPassword((prevShowNPassword) => !prevShowNPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword((prevShowCPassword) => !prevShowCPassword);
  };
  const navigate = useNavigate()

  const onSubmit = ({ confirmPassword, newPassword }) => {
    // console.log(data);
    if (confirmPassword !== newPassword) return setPsError('Password must be same');

    fetch(`http://localhost:5000/resetPassword/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('resetPasswordToken')}`
      },
      body: JSON.stringify({ newPassword })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast.success('Password reset successfully');
        navigate('/login');
        localStorage.removeItem('resetPasswordToken')
      })

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNPassword ? 'text' : 'password'}
                id="newPassword#"
                name="newPassword"
                {...register('newPassword', {
                  required: 'password is required',
                  minLength: {
                    value: 8,
                    message: 'password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'password must contain at least one letter, one number, and one special character',
                  },
                })}
                className="mt- py-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-3 flex items-center"
                onClick={toggleNPasswordVisibility}
              >
                {showNPassword ? (
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
            {errors.newPassword && <span className='text-red-400'>{errors.newPassword.message}</span>}

          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showCPassword ? 'text' : 'password'}
                id="confirmPassword#"
                name="confirmPassword"
                {...register('confirmPassword', {
                  required: 'password is required',
                  minLength: {
                    value: 8,
                    message: 'password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'password must contain at least one letter, one number, and one special character',
                  },
                })}
                className="mt-1 py-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-3 flex items-center"
                onClick={toggleCPasswordVisibility}
              >
                {showCPassword ? (
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
            {errors.confirmPassword && <span className='text-red-400'>{errors.confirmPassword.message}</span>}
          </div>
          {
            psError && <p className='text-red-500'>{psError}</p>
          }
          <div className="mt-4">
            <input
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              value={'Reset Password'}
            />

          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
