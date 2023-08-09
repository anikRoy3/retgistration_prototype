import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { contextProvider } from '../Context/Provider';
import { toast } from 'react-hot-toast';
import Loading from '../Components/Loading';

const UserInfoPage = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUser(data.user);
                setLoading(false)
            });
    }, []);
    useEffect(() => {
        if (!userId) navigate('/')
    }, [])

    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleEdit = () => {
        setEditMode(true);
    };

    const onSubmit = ({ name, address }) => {
        const newUser = {
            name, address,
        }
        fetch(`http://localhost:5000/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                // if(data.)
                console.log(data)
                if (data.user.modifiedCount === 0) {
                    toast.error('Nothing to update!!');
                    setEditMode(false)
                }
                if (data.user.modifiedCount) {
                    fetch(`http://localhost:5000/user/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            toast.success('User Information Updated Successfully!!')
                            setUser(data.user);
                            setEditMode(false)
                        })
                }
            })
    };
    if(loading) return <Loading/>
    console.log(user)
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-full h-64 object-cover object-center" src={user.imageUrl} alt={user.name} />
                <div className="p-4">
                    {editMode ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={user.name}
                                    {...register('name', { required: true })}
                                    className="w-full border rounded px-2 py-1"
                                />
                                {errors.name && <span className="text-red-400">This field is required</span>}
                            </h2>
                            <hr className="border-gray-200 mb-4" />
                            <div className="flex justify-between">
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            defaultValue={user.phone}
                                            {...register('phone', {
                                                required: 'Phone number is required',
                                                pattern: {
                                                    value: /^(?:\+?88)?01[13-9]\d{8}$/,
                                                    message: 'Invalid Bangladeshi phone number',
                                                },
                                            })}
                                            className={`w-full px-3 py-2 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                } focus:outline-none focus:border-blue-500`}
                                        />
                                        {errors.phone && (
                                            <span className="text-red-500 text-sm">{errors.phone.message}</span>
                                        )}
                                    </div>
                                    <p className="text-gray-700 text-base mb-2">
                                        Address:{' '}
                                        <input
                                            type="text"
                                            name="address"
                                            defaultValue={user.address}
                                            {...register('address', { required: true })}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                        {errors.address && <span className="text-red-400">This field is required</span>}
                                    </p>
                                </div>
                                <div className="flex items-center ms-3">
                                    <input
                                        type="submit"
                                        value={'Update'}
                                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mr-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{user.name}</h2>
                            <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                            <p className="text-gray-600 text-sm mb-2 mt-2">Role: {user.role}</p>
                            <hr className="border-gray-200 mb-4" />
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-700 text-base mb-2">Phone: {user.phone}</p>
                                    <p className="text-gray-700 text-base mb-2">Address: {user.address}</p>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        to={'#'}
                                        onClick={handleEdit}
                                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mr-2"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserInfoPage;
