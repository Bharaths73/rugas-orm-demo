import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo1.avif'

function Navbar() {
  return (
    <div className='w-full flex justify-center p-4 bg-gray-800 text-white h-16 fixed'>
      <div className='w-11/12 flex items-center justify-between h-full'>
      <div className='flex flex-row items-center gap-x-3  cursor-pointer'>
        <img src={logo} className='w-10 h-10 border rounded-full'/>
        <h1 className='text-xl font-semibold font-mono tracking-wider'>Order Management</h1>
      </div>
      <div className='max-w-max'>
        <ul className='flex flex-row gap-x-8 text-base'>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/customers">Customers</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Navbar