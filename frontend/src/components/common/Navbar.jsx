import React from 'react'
import { NavLink } from 'react-router-dom'
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


function Navbar() {
  return (
    <div className="w-full flex justify-center p-4 bg-gray-800 text-white h-16 fixed z-50">
      <div className="sm:w-11/12 w-full flex items-center justify-between h-full">
        <div className="flex flex-row items-center gap-x-3  cursor-pointer">
          <img src={logo} className="w-10 h-10 border rounded-full" />
          <h1 className="text-xl font-semibold font-mono tracking-wider">
            Order Management
          </h1>
        </div>
        <div className="max-w-max">
          {
            //   <ul className='flex flex-row gap-x-8 text-base'>
            //    <li>
            //      <NavLink to="/dashboard">Dashboard</NavLink>
            //    </li>
            //    <li>
            //      <NavLink to="/customers">Customers</NavLink>
            //    </li>
            //    <li>
            //      <NavLink to="/products">Products</NavLink>
            //    </li>
            //    <li>
            //      <NavLink to="/orders">Orders</NavLink>
            //    </li>
            //  </ul>
          }

          <NavigationMenu  className="">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-gray-800 text-white'><GiHamburgerMenu className='text-3xl'/></NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <NavLink to='/dashboard'>
                  <NavigationMenuLink className='text-sm font-semibold p-3'>Dashboard</NavigationMenuLink>
                  </NavLink>
                  <NavLink to='/customers'>
                  <NavigationMenuLink className='text-sm font-semibold p-3'>Customers</NavigationMenuLink>
                  </NavLink>
                  <NavLink to='/products'>
                  <NavigationMenuLink className='text-sm font-semibold p-3'>Products</NavigationMenuLink>
                  </NavLink>
                  <NavLink to='/orders'>
                  <NavigationMenuLink className='text-sm font-semibold p-3'>Orders</NavigationMenuLink>
                  </NavLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar