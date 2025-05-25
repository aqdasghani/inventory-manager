import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


uuidv4()


const Dashboard = () => {
  const [productsCount, setproductsCount] = useState()

  const [showForm, setShowForm] = useState(false)
  const [showProduct, setshowProduct] = useState([])
  const [showInput, setshowInput] = useState(false)
  const [editingProduct, seteditingProduct] = useState()
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: ''
  })


  const toastDelete = () => toast("Product deleted sucessfully!");


  const fetchCounts = () => {

    axios.get('/products')
      .then(res => setproductsCount(res.data.length))
      .catch(err => console.log(err))

  
  }

  const showproduct = () => {
    axios.get('/products')
      .then(res => setshowProduct(res.data))
      .catch(err => console.log(err))
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/products/${editingProduct.sku}`, {
        name: editingProduct.name,
        quantity: editingProduct.quantity,
        price: editingProduct.price
      });
      toast.success("Product edited successfully ✅");
      showproduct();
      seteditingProduct(null);
    } catch (err) {
      toast.error("Failed to update product ❌");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      await axios.post('/products', {
        name: formData.name,
        sku: formData.sku,
        quantity: formData.quantity,
        price: formData.price

      })

      setFormData({ name: '', sku: '', quantity: '', price: '' })
      setShowForm(false)
      fetchCounts()
      toast.success("Product added successfully ✅");

    } catch (error) {
      toast.error("Something went wrong ❌")

    }
  }


  const handleSort = () => {
   
    const sorted = [...showProduct].sort((a, b) => 

      a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase())
    )
    setshowProduct(sorted)
  
  }


  const closeForm = () => {
    seteditingProduct("")
  }

  useEffect(() => {

    fetchCounts()
    showproduct()

  }, [])



  return (

    <div>
      <div className="p-6 bg-gray-50 min-h-[89.5vh]">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Welcome to InventoryApp 👋</h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-gray-500 text-sm">Total Products</h2>
            <p className="text-2xl font-bold text-blue-600">{productsCount}</p>
          </div>

        
        </div>


        <div className='  min-md:flex justify-between items-center'>
          <div>
            <button onClick={() => { setShowForm(!showForm) }} className="md:inline-block px-4 py-2 my-6 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {showForm ? 'Close Form' : 'Add Product'}
            </button>

            {!showInput ? (<button
              onClick={() => setshowInput(true)}
              className="md:inline-block px-4 py-2 my-6 mx-4 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            > Delete Product </button>) : (<div className="flex items-center gap-3 my-4">
              <input
                type="text"
                placeholder="Enter SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md w-60"
              />
              <button
                onClick={async () => {
                  try {
                    await axios.delete(`/products/${formData.sku}`);
                    toastDelete()
                    setFormData({ ...formData, sku: '' });
                    setshowInput(false);
                    fetchCounts();

                  } catch (error) {
                    console.log(error);
                    alert("Failed to delete product ❌");
                  }

                }
                }
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, sku: '' });
                  setshowInput(false);
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
            )}
          </div>
          <div>
            <button className="md:inline-block px-4 py-2 my-6 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition" onClick={handleSort}>Sort by Name</button>
          </div>
        </div>




        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md p-6 rounded-lg max-w-md mx-auto mb-8">
            <label className="block mb-2">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" required
            />

            <label className="block mb-2">SKU</label>
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" required
            />

            <label className="block mb-2">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" required
            />

            <label className="block mb-2">Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" required
            />

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            > Submit Product </button>
          </form>
        )}



        {editingProduct && (
          <form
            onSubmit={handleEditSubmit}
            className="mt-6 bg-white shadow-md p-6 rounded-lg max-w-md mx-auto mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={editingProduct.name}
              onChange={e =>
                seteditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={editingProduct.sku}
              disabled
              className="w-full mb-4 px-3 py-2 border rounded bg-gray-100"
            />

            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={editingProduct.quantity}
              onChange={e =>
                seteditingProduct({ ...editingProduct, quantity: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={editingProduct.price}
              onChange={e =>
                seteditingProduct({ ...editingProduct, price: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />
            <div className='flex gap-4'>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Update Product
              </button>

              <button onClick={closeForm}
                type="button"
                className="w-full bg-gray-100 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </form>
        )}



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {showProduct.map(product => (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow-md">
              <div className='flex items-center justify-between gap-16'>
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <button ><lord-icon onClick={() => { seteditingProduct(product) }}
                  src="https://cdn.lordicon.com/exymduqj.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#3080e8"
                  style={{ "width": 30, "height": 30 }}>
                </lord-icon>
                </button>
              </div>
              <p><span className="font-medium">SKU:</span> {product.sku}</p>
              <p><span className="font-medium">Price:</span> ₹{product.price}</p>
              <p><span className="font-medium">Quantity:</span> {product.quantity}</p>
            </div>
          ))}
        </div>



      </div>
      <ToastContainer position="top-right" autoClose={2000} />

    </div >

  )

}


export default Dashboard
