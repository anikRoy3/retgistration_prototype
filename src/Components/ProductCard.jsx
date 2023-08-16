import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/Provider';
import Swal from 'sweetalert2'


const ProductCard = ({ product, setProducts }) => {

  const { name, description, image, price, _id, discount, quantity, category, ratings } = product;
  const discountPercentange = (parseInt(discount) / parseInt(price) * 100).toFixed(2);
  const updatedPrice = parseInt(price) - parseInt(discount);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const { setCart, role, email } = useContext(contextProvider);
  const [isInWishList, setIsInWishList] = useState(false);
  const { setIds } = useContext(contextProvider)
  const navigate = useNavigate()
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSaveClick = ({ name, price, description, discount, quantity }) => {
    const updatedProduct = {
      name, price, description, image, discount, quantity
    }
    fetch(`http://localhost:5000/products/${_id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
      .then(res => res.json())
      .then(data => {
        if (data.data.modifiedCount) {
          fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data.data))
        }
        toast.success(data.message, { id: 'updateProduct' })
        setIsEditMode(false);
      })

  };

  //delete product handler
  const handleDelete = (e) => {
    e.preventDefault()
    // const isConfirm = window.confirm("Are you want to delete sure?");
    Swal.fire({
      title: 'Are you sure?',
      text: "It will be delete permanantly.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/products/${_id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.data.deletedCount) {
              fetch("http://localhost:5000/products")
                .then(res => res.json())
                .then(data => setProducts(data.data))

              setDeleteMessage(data.message)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              toast.success(data.message, { id: 'deleteProduct' })
            }
          })

      }
    })

  }

  const cancleEdit = (e) => {
    e.preventDefault()
    setIsEditMode(false)
  }


  //add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    const storageCart = localStorage.getItem('cartItems')
    if (!storageCart) {
      localStorage.setItem('cartItems', JSON.stringify({ [_id]: 1 }))
    } else {
      const newParsedItem = JSON.parse(storageCart)
      if (newParsedItem[_id]) {
        newParsedItem[_id] = newParsedItem[_id] + 1
      } else {
        newParsedItem[_id] = 1
      }
      localStorage.setItem('cartItems', JSON.stringify(newParsedItem))

    }
    setCart(localStorage.getItem('cartItems'))
    toast.success('Product add to cart successfully.')
  }
  const location = useLocation()

  //handle wishlist
  const handleWishlist = (_id) => {
    // setToogleWishlist(!toggleWishlist);
    console.log(email, 'email')
    if (!email) {
      navigate('/login');
      return
    }
    setIsInWishList(!isInWishList)
    const wishlists = JSON.parse(localStorage.getItem('wishlists'));
    if (!wishlists) {
      localStorage.setItem('wishlists', JSON.stringify(new Array(_id)))
      setIds(JSON.stringify(new Array(_id)))
    } else {
      if (wishlists && wishlists.includes(_id)) {
        const newWishlists = wishlists?.filter((l) => l !== _id);
        localStorage.setItem('wishlists', JSON.stringify((newWishlists)))
        setIds(JSON.stringify((newWishlists)))
      } else {
        localStorage.setItem('wishlists', JSON.stringify(([...wishlists, _id])))
        setIds(JSON.stringify(([...wishlists, _id])))
      }

    }

  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('wishlists'))?.includes(_id)) {
      setIsInWishList(true)
    } else {
      setIsInWishList(false)
    }
  }, [isInWishList])



  return (
    <>

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg hover:bg-slate-100 shadow-lg p-4 mx-4 my-4 flex flex-col justify-between"
        style={{ height: '500px' }}
        onSubmit={handleSubmit(handleSaveClick)}
      >
        {
          isEditMode && <button
            onClick={cancleEdit}
            className=" text-red-600 hover:text-red-600"
          >
            <i className="fas fa-times px-2"></i>
            <span className='text-lg'>Cancel</span>
          </button>
        }
        <div className="aspect-w-3 aspect-h-2 mb-4">
          <div className='flex items-center justify-between'>
            {
              parseInt(discount) && !isEditMode > 0 ? <motion.div
                className="bg-gradient-to-r from-pink-500 to-purple-500 px-2 rounded-lg shadow-lg text-white"
                style={{ display: 'inline-block' }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">{discountPercentange}%</span>
                  <div className="flex flex-col">
                    <span className="font-semibold uppercase">Discount</span>
                    <span className="text-xs">Limited Time Offer</span>
                  </div>
                </div>
              </motion.div> : ""
            }
            <div>
              {
                isInWishList ? <img onClick={() => handleWishlist(_id)} src="https://cdn-icons-png.flaticon.com/128/833/833472.png"
                  className='w-9 h-9 text-red-600' alt="" /> : <img
                  onClick={() => handleWishlist(_id)}
                  className='w-9 h-9' src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" alt="" />
              }


            </div>
          </div>
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
              className="w-full border-2 px-1 mb-2 text-xl font-semibold text-gray-800"
              placeholder="Product Name"
            />
            {errors.name && <span className='text-red-400'>This field is required</span>}
          </>
        ) : (
          <h2 className="text-xl font-semibold text-gray-800 whitespace-normal max-w-md">
            {name.length > 16 ? `${name.slice(0, 16)} ...` : name}
          </h2>

        )}
        {isEditMode && (
          <>
            <div >
              <span>Discount:</span>
              <input
                type="number"
                defaultValue={discount}
                className="border-2 ms-3 px-1 mb-2 text-lg font-semibold text-green-600"
                {...register('discount')}
              />

            </div>
          </>

        )}
        {isEditMode ? (
          <>
            <div>
              <span>Price:</span>
              <input
                type="number"
                defaultValue={price}
                className="border-2 ms-3 px-1 mb-2 text-lg font-semibold text-green-600"
                placeholder="Price"
                {...register('price', { required: true })}
              />
              {errors.price && <span className='text-red-400'>This field is required</span>}
            </div>
          </>
        ) : (
          <p className="text-lg font-semibold text-green-600">
            {
              parseInt(discount) ? <span>{updatedPrice}$ <del>{price}$</del></span> : <span>{price}$</span>
            }

          </p>
        )}
        {isEditMode ? (
          <>
            <div>
              <span>Quantity:</span>
              <input
                type="number"
                defaultValue={quantity}
                className="border-2 ms-3 px-1 mb-2 text-lg font-semibold text-green-600"
                {...register('quantity', { required: true })}
              />
              {errors.quantity && <span className='text-red-400'>This field is required</span>}
            </div>
          </>

        ) : (
          <p className="text-lg font-semibold text-green-600">Quantity: {quantity}</p>
        )}

        <div className=''>
          {
            new Array(ratings).fill(null).map((_, index) => (
              <i key={index} className='fa fa-star text-yellow-400'></i>
            ))
          }
        </div>
        <div>
          <kbd className="kbd kbd-xs bg-orange-600 text-white">{category.name}</kbd>
        </div>
        {isEditMode ? (
          <>
            <textarea
              defaultValue={description}
              className="w-full border-2 px-2 mt-4 text-gray-700 resize-none"
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
          <>
            <input className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 mt-4 rounded-md" type='submit' value={'Save'} />
          </>

        ) : (
          <div className="flex space-x-2 mt-4 justify-between">
            {role === 'admin' && <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md">
              Edit
            </button>}

            <Link to={`/productDetails/${_id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-1 rounded-md"
            >Details</Link>

            {role === 'admin' && <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-md">Delete</button>
            }
            {role !== 'admin' && <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md">
              <i className="fas fa-shopping-cart mr-2"></i> Add to cart
            </button>}
          </div>
        )}
      </motion.form >
    </>

  );
};

export default ProductCard