import React from 'react'
import axios from '../api/axios'
import { useEffect, useState } from 'react'

const Products = () => {

  const [products, setproducts] = useState([])

  useEffect(() => {

    axios.get('/products')
      .then(res => setproducts(res.data))
      .catch(err => console.log(err))

  }, [])



  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 my-6 text-center">Your Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4">
        {products.map(product => (
          <div key={product._id} className="bg-gray-50 p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p><span className="font-medium">SKU:</span> {product.sku}</p>
            <p><span className="font-medium">Price:</span> ₹{product.price}</p>
            <p><span className="font-medium">Quantity:</span> {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
