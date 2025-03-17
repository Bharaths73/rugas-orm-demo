import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Customers from './Pages/Customers'
import Products from './Pages/Products'
import Orders from './Pages/Orders'
import Navbar from './components/common/Navbar'
import Auth from './Pages/Auth'
import PublicRoute from './components/Auth/PublicRoute'
import PrivateRoute from './components/Auth/PrivateRoute'

function App() {

  return (
    <div className="w-screen min-h-screen flex flex-col mb-5">
      <Navbar />
      <Routes>
            <Route path="/login" element={<PublicRoute><Auth /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Auth /></PublicRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        
        {/* {
        <Route path="*" element={<NotFound />} /> 
        } */}
      </Routes>
    </div>
  );
}

export default App
