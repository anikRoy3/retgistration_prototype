import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Signup() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const location = useLocation()
  console.log(location, '')
  const pin = location.pathname.split('/')[3];
  console.log(pin)
  // let role = 'user';
  const [role, setRole]= useState('user')
  console.log(import.meta.env.VITE_ADMIN_PIN)
  useEffect(() => {
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      setRole('admin')
    } else {
      console.log('come')
      navigate('/signup')
    }
  }, [])
  console.log(role)
  const onSubmit = ({ image, name, address, password, email, phone }) => {
    console.log( role)
    const url = `https://api.imgbb.com/1/upload?key=c6d4d5097ea23cc307de3ef0ba8c19d1`;
    const formData = new FormData();
    formData.append('image', image[0]);

    setLoading(true);
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {

        if (data.data.url) {
          console.log(data.data.url, role)
          const user = {
            name, address, password, email,
            imageUrl: data.data.url, phone, role
          }
          fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
          }).then(res => res.json())
            .then(data => {

              if (data.status > 200) {
                setErrorMessage(data.message)
              } else {
                setErrorMessage('')
                navigate('/login')
              }
            })
        }
        setLoading(false);
      });
    console.log(errorMessage)
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputBlur = (field) => () => {
    trigger(field);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-4 ">
      <motion.form
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-4 ">Join With Us</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            name="firstName"
            {...register('name', { required: true })}
            onBlur={handleInputBlur('name')}
          />
          {errors.name && <span className='text-red-400'>{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            id="email"
            type="email"
            name="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            onBlur={handleInputBlur('email')}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>


        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^(?:\+?88)?01[13-9]\d{8}$/,
                message: 'Invalid Bangladeshi phone number',
              },

            })}
            onBlur={handleInputBlur('phone')}
            className={`w-full px-3 py-2 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
            name="address"
            {...register('address', { required: true })}
            onBlur={handleInputBlur('address')}
          />
          {errors.address && <span className='text-red-400'>This field is required</span>}
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
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    'Password must contain at least one letter, one number, and one special character',
                },
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
        <div className="mt-4 py-3">
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            onBlur={handleInputBlur('image')}
            className="border border-gray-300 py-2 px-4 rounded-lg w-full text-center cursor-pointer hover:bg-blue-50"
          />

          <div>
            {
              errorMessage ? <p className='py-3 text-red-500'>{errorMessage} </p> : ''
            }
          </div>
          {errors.image && <span className='text-red-400'>This field is required</span>}
        </div>
        <div className='py-4'>Already Have an Accout? <Link to={'/login'} className='text-blue-400'>Login</Link></div>
        <div className="flex items-center justify-center">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" value={loading ? 'Loading...' : 'Register'}
          />
        </div>
      </motion.form>
    </div>
  )
}

export default Signup
