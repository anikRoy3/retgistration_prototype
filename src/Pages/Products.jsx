import { useContext, useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import AddProductModal from '../Components/Utils/AddProductModal';
import ProductCard from '../Components/ProductCard';
import { contextProvider } from '../Context/Provider';
import CategoriesSwiper from '../Components/Categories/CategoriesSwiper';


const ProductPage = () => {
  const { user, key } = useContext(contextProvider)

  //check loggged in user 
  const [products, setProducts] = useState([])
  const [filteredPd, setFilteredPd] = useState([])
  const [loading, setLaoding] = useState(false)
  const [filterItems, setFilterItems] = useState([]);
  const [searchPd, setSearchPd] = useState([])

  useEffect(() => {
    setLaoding(true)
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.data))
    setLaoding(false)
  }, [])

  useEffect(() => {
    if (filterItems.length === 0) {
      setFilteredPd([])
    }
    if (filterItems.length > 0) {
      setFilteredPd([])
      filterItems.forEach(item => {
        const obj = products.find(pd => pd.category.name === item);
        setFilteredPd((prev) => [...prev, obj])
      });
    }
  }, [filterItems])

  if (loading) return <Loading />;

  const handleFilter = (item) => {
    if (filterItems.includes(item)) {
      setFilterItems(prev => prev.filter((im) => im !== item))
    } else {
      setFilterItems(prev => [...prev, item])
    }
  }
  useEffect(() => {
    if (key && key.length > 3) setSearchPd(products.filter((pd) => (pd.description.toUpperCase().includes(key.toUpperCase()) || pd.name.toUpperCase().includes(key.toUpperCase()))))
  }, [key])
  console.log(searchPd)
  return (
    <section>
      {
        user?.role === 'admin' && <div className='bg-gray-100 py-5 flex justify-center'>
          <button onClick={() => window.my_modal_5.showModal()} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md">
            <i className="fas fa-plus mr-2"></i> Add Product
          </button>
        </div>
      }
      <section>
        <div className='bg-gray-100 flex p-8 items-center'>
          <h2 className="text-2xl font-semibold mb-4 ">Categories:</h2>
          <CategoriesSwiper products={products} handleFilter={handleFilter} setFilterItems={setFilterItems} filterItems={filterItems} />
        </div> 
      </section>
      <section className='bg-gray-100'>
        <h2 className="text-2xl font-semibold px-8 mb-4">Our Popular Products</h2>
        {key && key.length > 3 && <div>
          <div className="text-center text-3xl font-bold text-gray-800">
            Search Result For "{key}"
          </div>
          <div className="text-center text-lg text-gray-600 mb-8">
            Total Result: <span className="text-blue-500">{searchPd.length}</span>
          </div>
        </div>}

        <div className=" flex flex-wrap justify-center items-center ">
          {key.length > 3 ? searchPd.map((product) => (<ProductCard product={product} key={product._id} />)) : filteredPd.length > 0 ? filteredPd.map((product) => (
            <ProductCard key={product._id} product={product} setProducts={setProducts} />
          )) : products.length > 0 ? products.map((product) => (
            <ProductCard key={product._id} product={product} setProducts={setProducts} />
          )) : 'No products Here..!!!'}


        </div>

        {key.length > 3 && searchPd.length === 0 && <div className='flex items-center justify-center mx-auto w-full'>
          <img className='w-14 mr-6' src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="" />
          <p className='text-center'>No result found for this keyword...</p>
        </div>}
      </section>
      <AddProductModal setProducts={setProducts} />
    </section>
  );
};

export default ProductPage;
