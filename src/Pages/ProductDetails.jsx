import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// const maodel = user.ProductDetails()

const ProductDetails = ({ product}) => {
    
    const handleClose=(e)=>{
        e.preventDefault()
        const modal = document.getElementById('my_modal_6')
        modal.close()
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="card h-auto w-1/2 lg:card-side bg-base-100 shadow-xl"
        >
            {/* Open the modal using ID.showModal() method */}
            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                <div method="dialog" className="modal-box">
                    <div>
                        <button className="btn btn-xs btn-warning" onClick={handleClose}><i className="fa fa-times"></i> Close</button>
                    </div>
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product?.name}</h2>
                        <p className="text-lg font-semibold text-green-600 mb-4">${product?.price}</p>
                        <div className="aspect-w-3 aspect-h-2 mb-4">
                            <img
                                src={product?.image}
                                alt={product?.name}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                        <p className="text-gray-700 mt-4">{product?.description}</p>
                    </div>

                </div>
            </dialog>
        </motion.div>
    );
};

export default ProductDetails;
