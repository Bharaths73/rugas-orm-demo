import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Customers from './Pages/Customers'
import Products from './Pages/Products'
import Orders from './Pages/Orders'
import Navbar from './components/common/Navbar'

function App() {

  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        {/* <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App
