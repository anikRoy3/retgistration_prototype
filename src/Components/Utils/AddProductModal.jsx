import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function AddProductModal({ setProducts }) {
    const { handleSubmit, reset, register, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = ({ name, price, description, image }) => {
        //add product
        const url = `https://api.imgbb.com/1/upload?key=c6d4d5097ea23cc307de3ef0ba8c19d1`;
        const formData = new FormData();
        formData.append('image', image[0]);

        setLoading(true)
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.url) {
                    const product = {
                        name, price, description, image: data.data.url
                    }
                    fetch('http://localhost:5000/products', {
                        method: "POST",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            fetch('http://localhost:5000/products')
                                .then(res => res.json())
                                .then(data => setProducts(data.data))
                            setLoading(false);
                            setSuccessMessage(data.message)
                            toast.success(data.message)
                            closeModal()

                        })
                }
            })


        // reset();
        // window.closeModal(); // Close the modal after successful form submission
    };
    const closeModal = () => {
        // Get the modal element and close it
        const modal = document.getElementById('my_modal_5');
        modal.close();
    };

    return (
        <div>
            {/* Open the modal using window.showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit(onSubmit)} className="modal-box p-6 rounded-lg shadow-md bg-white">
                    <h3 className="font-bold text-xl mb-4 text-gray-700">Add Product</h3>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border border-gray-900 rounded-lg"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className='text-red-400'>This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="w-full p-3 border border-gray-700 rounded-lg"
                            {...register('price', { required: true })}
                        />
                        {errors.price && <span className='text-red-400'>This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-3 border border-gray-700 rounded-lg resize-none"
                            rows="4"
                            {...register('description', { required: true })}
                        />
                        {errors.description && <span className='text-red-400'>This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image', { required: true })}
                            className="file-input-info file-input-bordered file-input-xs w-full max-w-xs"
                        />
                        {errors.iamge && <span className='text-red-400'>This field is required</span>}
                    </div>
                    <div className='flex justify-end'>
                        <input className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-md py-1"
                            value={loading ? 'Adding...' : 'Add'} type='submit'
                        />

                        <span className="bg-red-500 ms-3 hover:bg-red-700 text-white px-4 rounded-md py-1 w-16" onClick={closeModal}>Close</span>
                    </div>
                </form>
            </dialog>
        </div>
    );
}
