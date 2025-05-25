import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'

const Invoices = () => {

  const [showInvoices, setshowInvoices] = useState([])

  useEffect(() => {

    axios.get('/invoices')
      .then(res => setshowInvoices(res.data))
      .catch(err => console.log(err))

  }, [])


  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 my-6 text-center">Your Invoices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4">
        {showInvoices.map(invoice => (
          
            <div key={invoice._id} className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Invoice #{invoice._id.slice(-6).toUpperCase()}</h2>
              <p className="mb-2"><strong>Customer:</strong> {invoice.customerName}</p>
              <p className="mb-4"><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>

             
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2">Product</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-2">{item.productName || item.productId}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">₹{item.price}</td>
                      <td className="py-2">₹{item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-right font-bold text-lg">
                Total Amount: ₹{invoice.totalAmount}
              </div>
            

          </div>
        ))}
      </div>
    </div>

  )
}

export default Invoices
