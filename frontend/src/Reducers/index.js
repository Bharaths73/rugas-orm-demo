import { combineReducers } from "@reduxjs/toolkit";
import customersReducer from '../Slices/customersSlice'
import productsReducer from '../Slices/productsSlice'
import ordersReducer from '../Slices/ordersSlice'
import authReducer from '../Slices/AuthSlice'

const rootReducer=combineReducers({
    customers:customersReducer,
    products:productsReducer,
    orders:ordersReducer,
    auth:authReducer
})

export default rootReducer;