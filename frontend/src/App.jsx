import './App.css'
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Products = lazy(() => import('./Pages/Products'));
const Customers = lazy(() => import('./Pages/Customers'));
const Orders = lazy(() => import('./Pages/Orders'));
const Navbar= lazy(() => import('./components/common/Navbar'));
const Auth = lazy(() => import('./Pages/Auth'));
const Error = lazy(() => import('./Pages/Error'));
import PublicRoute from './components/Auth/PublicRoute'
import PrivateRoute from './components/Auth/PrivateRoute'
import { useSelector } from 'react-redux'

function App() {

  const {token}=useSelector(state=>state.auth)
  return (
    <div className="w-screen min-h-screen flex flex-col mb-5">
      <Navbar />
      <Suspense fallback={<h2 className='text-2xl text-center my-auto'>Loading...</h2>}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="/" element={
          token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<Error />} />
      </Routes>
      </Suspense>
    </div>
  );
}

export default App
