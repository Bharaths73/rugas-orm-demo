import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
  const {token}=useSelector(state=>state.auth)
  if(token){
     return children
  }
  return <Navigate to="/login" />
}

export default PrivateRoute