import toast from "react-hot-toast";
import { Orders } from "../Api";
import { apiConnector } from "../ApiConnector";
import { setProducts } from "@/Slices/productsSlice";
import { setOrders } from "@/Slices/ordersSlice";

export const getAllOrders=async(dispatch,token)=>{
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

export const addOrder=async(dispatch,orderData,token)=>{
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

export const updateOrder=async(dispatch,orderData,token)=>{
    const toastId=toast.loading('Updating order')
    console.log("updated order is ",orderData);
    
    try{
        const response=await apiConnector('PUT', Orders.UPDATE_ORDER_API,orderData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        // console.log(response.data.customers);
    
        // dispatch(setCustomers(response.data.customers))
        toast.success("Updated order successfully")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed to update order";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const deleteOrderData=async(dispatch,id,token)=>{
    const toastId=toast.loading('Deleting Order')
    console.log("id is ",id);
    
    try{
        const response=await apiConnector('DELETE', `${Orders.DELETE_ORDER_API}/${id}`,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.orders);
    
        dispatch(setOrders(response.data.orders))
        toast.success("Deleted order successfully")
    }
    catch(error){
        console.log("deletion error",error);
        
        const errorMessage = error?.response?.data?.message || "Failed to delete order";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}