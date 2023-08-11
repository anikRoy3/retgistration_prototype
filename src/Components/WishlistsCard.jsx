import React from 'react'
import { motion } from 'framer-motion'

export default function WishlistsCard({ product }) {
    console.log(product )
    const {name, image, description, price}=product
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}
