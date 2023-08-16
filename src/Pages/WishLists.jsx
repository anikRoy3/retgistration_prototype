import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { contextProvider } from '../Context/Provider';

const WishLists = () => {
    const [products, setProducts] = useState([]);
    const {ids}= useContext(contextProvider)
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await Promise.all(JSON.parse(ids).map(async id => {
                const url = `http://localhost:5000/products/${id}`;
                const response = await fetch(url);
                const data = await response.json();
                return data.data;
            }));
            setProducts(fetchedProducts);
        };

        if (ids && ids.length > 0) {
            fetchProducts();
        }
    }, [ids]);
    console.log('products', products)
    return (
        <div className="container mx-auto py-8">

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.length > 0 && products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))
                }
            </div>
            {products.length === 0 && <div className='flex items-center justify-center mx-auto w-full'>
                <img className='w-14 mr-6' src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="" />
                <p className='text-center'>No products added to wishlists</p>
            </div>}
            <div className="text-center mt-8 ">
                <Link to="/products" className="btn ">
                    Add product to wishlists
                </Link>
            </div>
        </div>
    )
}

export default WishLists;
