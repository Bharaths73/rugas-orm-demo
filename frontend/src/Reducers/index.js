import { combineReducers } from "@reduxjs/toolkit";
import customersReducer from '../Slices/customersSlice'

const rootReducer=combineReducers({
    customers:customersReducer
})

export default rootReducer;