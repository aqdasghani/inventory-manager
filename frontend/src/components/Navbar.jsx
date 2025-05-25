import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">

                <div className="text-2xl font-semibold text-blue-600">
                    InventoryApp
                </div>

                <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
                    <li><Link to="/" className="hover:text-blue-600 transition">Dashboard</Link></li>
                    <li><Link to="/products" className="hover:text-blue-600 transition">Products</Link></li>
                   
                   
                </ul>


                <div className="flex items-center space-x-4">
            
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <span className="text-sm font-semibold">AG</span>
                    </div>
                </div>


                <div className="md:hidden">
                    <button id="mobile-menu-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

        </div>
    )
}

export default Navbar




