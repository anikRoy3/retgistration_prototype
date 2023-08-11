import React from 'react';
import CategoriesSwiper from './Categories/CategoriesSwiper';


const Categories = ({ products, setFilterItems, filterItems }) => {

  console.log('filterItems', filterItems)



  return (
    <div className="bg-gray-100 py-8">
      <div className="px-8">
        <div className='flex items-center mb-9'>
          <h2 className="text-2xl font-semibold mb-4">Categories:</h2>
          <div
            onClick={() => setFilterItems([])}
            className={` ms-4 cursor-pointer px-8 flex justify-between p-2 rounded shadow hover:shadow-md transition duration-300 ${filterItems.length === 0 ? "bg-gray-500 text-white" : "bg-white"}`}
          >
            <h3 className="text-lg font-semibold uppercase mb-2">All</h3>

          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CategoriesSwiper
            products={products}
            handleFilter={handleFilter}
            filterItems={filterItems} />
          {/* {products.map(({ category: { name, image } }) => {
            return (
              <div
                key={image}
                onClick={() => handleFilter(name)}
                className={`bg-white cursor-pointer flex flex-col md:flex-row items-center justify-between p-4 rounded shadow hover:shadow-blue-200 hover:shadow-2xl transition duration-300 ${filterItems.includes(name) ? "bg-gray-600 text-white" : ""}`}
              >
                <h3 className="text-md font-semibold mb-2 md:mb-0 md:mr-4 uppercase">{name}</h3>
                <img className="w-12 self-center md:w-16" src={image} alt={name} />
              </div>
            );
          })} */}
          {/*  */}
        </div>

      </div>
    </div>

  );
};

export default Categories;
