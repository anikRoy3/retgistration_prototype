import { useContext, useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import AddProductModal from '../Components/Utils/AddProductModal';
import ProductCard from '../Components/ProductCard';
import { contextProvider } from '../Context/Provider';
import CategoriesSwiper from '../Components/Categories/CategoriesSwiper';


const ProductPage = () => {
  const { user } = useContext(contextProvider)

  //check loggged in user 
  const [products, setProducts] = useState([])
  const [filteredPd, setFilteredPd] = useState([])
  const [loading, setLaoding] = useState(false)
  const [filterItems, setFilterItems] = useState([]);

  // console.log('filterItems', filterItems)
  useEffect(() => {
    setLaoding(true)
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.data))
    setLaoding(false)
  }, [])

  useEffect(() => {
    // console.log('come', filterItems)
    if (filterItems.length === 0) {
      setFilteredPd([])
    }
    if (filterItems.length > 0) {
      setFilteredPd([])
      filterItems.forEach(item => {
        console.log('item', item)
        const obj = products.find(pd => pd.category.name === item);
        setFilteredPd((prev) => [...prev, obj])
      });
    }
    // setFilterItems([])
  }, [filterItems])



  if (loading) return <Loading />;

  const handleFilter = (item) => {
    if (filterItems.includes(item)) {
      setFilterItems(prev => prev.filter((im) => im !== item))
    } else {
      setFilterItems(prev => [...prev, item])
    }
  }
  // console.log(searchKeyword)
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
        <div className='bg-gray-100 flex p-8 '>
          <h2 className="text-2xl font-semibold mb-4 ">Explore Categories:</h2>
          <CategoriesSwiper products={products} handleFilter={handleFilter} setFilterItems={setFilterItems} filterItems={filterItems} />
        </div>
        {/* <CategoriesSwiper products={products} setFilterItems={setFilterItems} filterItems={filterItems} /> */}
        {/* <Categories setFilterItems={setFilterItems} filterItems={filterItems} products={products} /> */}
      </section>
      <section className='bg-gray-100'>
        <h2 className="text-2xl font-semibold px-8 mb-4">Our Popular Products</h2>
        <div className=" flex flex-wrap justify-center items-center ">
          {filteredPd.length > 0 ? filteredPd.map((product) => (
            <ProductCard key={product._id} product={product} setProducts={setProducts} />
          )) : products.length > 0 ? products.map((product) => (
            <ProductCard key={product._id} product={product} setProducts={setProducts} />
          )) : 'No products Here..!!!'}


        </div>
      </section>
      <AddProductModal setProducts={setProducts} />
    </section>
  );
};

export default ProductPage;
