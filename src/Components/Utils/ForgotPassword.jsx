import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword({ way }) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [otp, setOTP] = useState(null);
    const modal = document.getElementById('forgot_password');
    const navigate = useNavigate();
    const [userId, setUserId] = useState('')

    const onSubmit = ({ email, userOtp }) => {
        setErrorMessage('')
        console.log(otp, userOtp)
        if (otp) {
            if (userOtp == otp) {
                return navigate(`/reset-password/${userId}`)
            } else {
               return setErrorMessage('Wrong otp, please try again!!')
            }
        }
        const url = `http://localhost:5000/forgotPassword`;

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, way })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.status === 200) {
                    if (data.otp) {
                        setUserId(data.data._id)
                        return setOTP(data.otp);
                    }
                    if (data.mailInfo.status === 200) {
                        toast.success('Please check your email for reset password');
                        localStorage.setItem('resetPasswordToken', data.token);
                        modal.close()
                    }
                }
                if (data.status > 200) {
                    setErrorMessage(data.message)
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setErrorMessage(error.message)
            });
    };




    //close modal
    const handleClose = (e) => {
        e.preventDefault()
        modal.close()
    }

    return (
        <>
            <dialog id="forgot_password" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
                    <div>
                        <div className='text-end py-2'>
                            <button onClick={(e) => handleClose(e)} className="btn btn-xs btn-circle"><i className='fa fa-close'></i></button>
                        </div>
                        <h3 className="font-bold text-lg">
                            {
                                way === 'otp' ? "Enter your email and we'll send you a OTP to reset your password" : "Enter your email and we'll send you a Link to reset your password"
                            }
                        </h3>
                        <div>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                id="email#"
                                type="email"
                                name="email"
                                placeholder='Enter your email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div>
                            {
                                otp && <p className='py-2 text-green-500'>Please check your email for for get the OTP</p>
                            }
                        </div>
                        {otp && <div>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2 $}
                                    `}
                                id="userOtp#"
                                type="userOtp"
                                name="userOtp"
                                placeholder='Enter your OTP here'
                                {...register('userOtp')}
                            />
                        </div>
                        }                        <div className='text-red-600'>
                            {errorMessage && errorMessage}
                        </div>
                        <input type="submit" className="inline-flex my-3 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg" value={'Send'} />
                    </div>
                </form>
                <div>
                </div>
            </dialog >
        </>
    )
}
