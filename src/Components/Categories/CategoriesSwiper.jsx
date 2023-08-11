import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';




export default function CategoriesSwiper({ products, setFilterItems, filterItems, handleFilter }) {
  // console.log(products, filterItems, handleFilter)
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      className="mySwiper"
      style={{
        backgroundColor: filterItems.includes(name) ? '#606060' : 'white',
        color: filterItems.includes(name) ? 'white' : 'black',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgb(243 244 246)  ',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',

      }}
    >
      <SwiperSlide onClick={() => setFilterItems([])} className={`ms-4 cursor-pointer px-8 flex justify-between p-2 rounded shadow hover:shadow-md transition duration-300 ${filterItems.length === 0 ? "bg-gray-500 text-white" : "bg-white"}`}>All</SwiperSlide>
      {products.map((product) => {
        const { category: { name, image }, _id }= product
        return (
          <SwiperSlide key={_id}>
            <div
              key={image}
              onClick={() => handleFilter(name)}
              className={`bg-white cursor-pointer h-16 flex flex-col md:flex-row items-center justify-between p-4 rounded shadow hover:shadow-blue-200 hover:shadow-2xl transition duration-300 ${filterItems.includes(name) ? "bg-gray-600 text-white" : ""}`}
            >
              <h3 className="text-md font-semibold mb-2 md:mb-0 md:mr-4 uppercase">{name}</h3>
              <img
                className="w-12 self-center hidden sm:block md:block"
                src={image}
                alt={name}
              />

            </div>
          </SwiperSlide>


        );
      })}

    </Swiper>
  );
}
