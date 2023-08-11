import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../Components/ProductCard';



const SearchResults = () => {

    const { searchKeyword } = useParams();
    const [searchResults, setSearchResult] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                const searchedPd = data.data.filter((pd) => pd.name.toUpperCase().includes(searchKeyword.toUpperCase()))
                setSearchResult(searchedPd)
            })
    }, [searchKeyword])

    console.log(searchResults, searchKeyword)
    return (
        <div className="container mx-auto py-8">
            <div className="text-center text-3xl font-bold text-gray-800">
                Search Result For "{searchKeyword}"
            </div>
            <div className="text-center text-lg text-gray-600 mb-8">
                Total Result: <span className="text-blue-500">{searchResults.length}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.length > 0 && searchResults.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))
                }
            </div>
            {searchResults.length === 0 && <div className='flex items-center justify-center mx-auto w-full'>
                <img className='w-14 mr-6' src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="" />
                <p className='text-center'>No result found for this keyword...</p>
            </div>}
            <div className="text-center mt-8 ">
                <Link to="/products" className="btn ">
                    See All Products
                </Link>
            </div>
        </div>
    );
};



export default SearchResults;
