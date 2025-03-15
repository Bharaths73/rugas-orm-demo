import toast from "react-hot-toast";
import { Orders } from "../Api";
import { apiConnector } from "../ApiConnector";
import { setProducts } from "@/Slices/productsSlice";
import { setOrders } from "@/Slices/ordersSlice";
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGg3c21zQGdtYWlsLmNvbSIsImlkIjoiNjdkMjdkNDJkODQxYmExZTUwMmEzOGVhIiwiaWF0IjoxNzQyMDI1MjYxLCJleHAiOjE3NDIxMTE2NjF9.HdTJJrA6ku9-jScUFqZUSFA-N0obTy7ZV--GHaId4Zc"

export const getAllOrders=async(dispatch)=>{
    const toastId=toast.loading('Getting all orders')
    
    try{
        const response=await apiConnector('GET', Orders.GET_ALL_ORDERS_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.orders);
        dispatch(setOrders(response?.data?.orders))
        toast.success("Fetched orders successfully")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed to get all orders";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const addOrder=async(dispatch,orderData)=>{
    const toastId=toast.loading('Creating order')
    console.log("order is ",orderData);
    
    try{
        const response=await apiConnector('POST', Orders.ADD_ORDER_API,orderData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        // console.log(response.data.customers);
    
        // dispatch(setCustomers(response.data.customers))
        toast.success("Created order successfully")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed create order";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}