import { combineReducers } from "@reduxjs/toolkit";
import customersReducer from '../Slices/customersSlice'
import productsReducer from '../Slices/productsSlice'
import ordersReducer from '../Slices/ordersSlice'

const rootReducer=combineReducers({
    customers:customersReducer,
    products:productsReducer,
    orders:ordersReducer,
})

export default rootReducer;