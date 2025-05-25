import React from "react"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Invoices from './pages/Invoices'
import Products from './pages/Products'

function App() {


  return (
    <>
     
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/products" element={<Products/>}/>
          


        </Routes>


    </>
  )
}

export default App
