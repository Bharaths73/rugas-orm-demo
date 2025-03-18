import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo1.avif'
import { GiHamburgerMenu } from "react-icons/gi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { logout } from '@/Services/operations/Auth';
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const token=useSelector((state)=>state.auth.token)

  const logoutHandler=async()=>{
      await logout(dispatch,navigate,token)
  }

  return (
    <div className="w-full flex justify-center p-4 bg-gray-800 text-white h-16 fixed z-50">
      <div className="sm:w-11/12 w-full flex items-center justify-between h-full">
        <div className="flex flex-row items-center gap-x-3  cursor-pointer">
          <img src={logo} className="w-10 h-10 border rounded-full" />
          <h1 className="sm:text-xl text-lg font-semibold font-mono tracking-wider">
            Order Management
          </h1>
        </div>
        <div className="max-w-max">
          {
              token && 
              <ul className='hidden md:flex flex-row gap-x-8 text-base'>
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
               <li onClick={logoutHandler} className='cursor-pointer'>
                 <div to="/orders">Logout</div>
               </li>
             </ul>
          }

          {
             token &&
             <NavigationMenu  className="md:hidden">
            <NavigationMenuList className=''>
              <NavigationMenuItem className=''>
                <NavigationMenuTrigger className='bg-gray-800 text-white'><GiHamburgerMenu className='text-3xl'/></NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  
                  <NavigationMenuLink asChild className='text-sm font-semibold p-3 cursor-pointer'><NavLink to='/dashboard'>Dashboard</NavLink></NavigationMenuLink>
                  
                  
                  <NavigationMenuLink asChild className='text-sm font-semibold p-3 cursor-pointer'><NavLink to='/customers'>Customers</NavLink></NavigationMenuLink>
                  
                  
                  <NavigationMenuLink asChild className='text-sm font-semibold p-3 cursor-pointer'><NavLink to='/products'>Products</NavLink></NavigationMenuLink>
                  
                  
                  <NavigationMenuLink asChild className='text-sm font-semibold p-3 cursor-pointer'><NavLink to='/orders'>Orders</NavLink></NavigationMenuLink>
                  
                  <NavigationMenuLink className='text-sm font-semibold p-3 cursor-pointer' onClick={logoutHandler}>Logout</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar