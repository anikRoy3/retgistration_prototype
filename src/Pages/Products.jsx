import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import AddProductModal from '../Components/Utils/AddProductModal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ProductDetails from './ProductDetails';



const ProductCard = ({ product, setProducts }) => {

  const { name, description, image, price, _id } = product
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('')

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSaveClick = ({ name, price, description }) => {
    const updatedProduct = {
      name, price, description, image
    }
    fetch(`http://localhost:5000/products/${_id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.data.modifiedCount) {
          fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data.data))
        }
        toast.success(data.message, { id: 'updateProduct' })
        setIsEditMode(false);
      })

  };
  
  const handleDelete = (e) => {
    e.preventDefault()
    console.log('hellop')
    const isConfirm = window.confirm("Are you want to delete sure?");
    if (isConfirm) {
      fetch(`http://localhost:5000/products/${_id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.data.deletedCount) {
            fetch("http://localhost:5000/products")
              .then(res => res.json())
              .then(data => setProducts(data.data))

            setDeleteMessage(data.message)
            toast.success(data.message, { id: 'deleteProduct' })
          }
        })
    }
  }


  const handleProductDetails = (e) => {
    e.preventDefault()
    const modal = document.getElementById('my_modal_6');
    modal.showModal()
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 flex flex-col justify-between"
        style={{ height: '400px' }}
        onSubmit={handleSubmit(handleSaveClick)}
      >
        <div className="aspect-w-3 aspect-h-2 mb-4">
          {isEditMode ? (
            <>
              {image ? (
                <img
                  src={image}
                  alt="New Product"
                  className="w-80 h-28 object-contain rounded-lg"
                />
              ) : (
                <label className="cursor-pointer">
                  <input type="file"  {...register('image', { required: true })} className="hidden" />
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                    <span className="text-gray-400">Choose Image</span>
                  </div>
                  {errors.image && <span className='text-red-400'>This field is required</span>}
                </label>
              )}
            </>
          ) : (
            <img
              src={image}
              alt={name}
              className="w-80 h-28 object-contain rounded-lg"
            />
          )}
        </div>


        {isEditMode ? (
          <>

            <input
              type="text"
              defaultValue={name}
              {...register('name', { required: true })}
              className="w-full mb-2 text-xl font-semibold text-gray-800"
              placeholder="Product Name"
            />
            {errors.name && <span className='text-red-400'>This field is required</span>}
          </>
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        )}
        {isEditMode ? (
          <>
            <input
              type="text"
              defaultValue={price}
              className="w-full mb-2 text-lg font-semibold text-green-600"
              placeholder="Price"
              {...register('price', { required: true })}
            />
            {errors.price && <span className='text-red-400'>This field is required</span>}        </>

        ) : (
          <p className="text-lg font-semibold text-green-600">{price}$</p>
        )}
        {isEditMode ? (
          <>
            <textarea
              defaultValue={description}
              className="w-full mt-4 text-gray-700 resize-none"
              placeholder="Product Description"
              {...register('description', { required: true })}
            />
            {errors.description && <span className='text-red-400'>This field is required</span>}
          </>
        ) : (
          <p className="text-gray-700 mt-4">{''}</p>
        )}
        <div>
          {
            <p>{deleteMessage && deleteMessage}</p>
          }
        </div>
        {isEditMode ? (
          <input className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 mt-4 rounded-md" type='submit' value={'Save'} />


        ) : (
          <div className="flex space-x-2 mt-4 justify-between">
            <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md">
              Edit
            </button>
            <button onClick={handleProductDetails} className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-1 rounded-md"
            >Details</button>

            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-md">Delete</button>
          </div>
        )}
      </motion.form>
      <ProductDetails id={_id} key={_id}  product={product}/>
    </>

  );
};



const ProductPage = () => {

  //check loggged in user 
  const [products, setProducts] = useState([])
  const [loading, setLaoding] = useState(false)


  useEffect(() => {
    setLaoding(true)
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.data))
    setLaoding(false)
  }, [])

  /*  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email]); */
  console.log('first', loading)
  if (loading) return <Loading />;
  console.log(products, loading)

  return (
    <section>
      <div className='bg-gray-100 py-5 flex justify-center'>
        <button onClick={() => window.my_modal_5.showModal()} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md">
          <i className="fas fa-plus mr-2"></i> Add Product
        </button>
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center">

        {products.map((product) => (
          <ProductCard key={product._id} product={product} setProducts={setProducts} />
        ))}
      </div>
      <AddProductModal setProducts={setProducts} />
    </section>
  );
};

export default ProductPage;
