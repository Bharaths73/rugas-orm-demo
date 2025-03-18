import toast from "react-hot-toast"
import { Customers } from "../Api"
import { apiConnector } from "../ApiConnector"
import { setCustomers } from "@/Slices/customersSlice"

export const getAllCustomers=async(dispatch,token)=>{
    const toastId=toast.loading('Getting all customers')
    console.log("token",token);
    try{
        const response=await apiConnector('GET', Customers.GET_ALL_CUSTOMERS_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.customers);
    
        dispatch(setCustomers(response.data.customers))
        toast.success("Fetched customers successfully")
    }
    catch(error){
        const errorMessage = error?.response?.data?.message || "Failed to get all customers";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const addCustomer=async(dispatch,customerData,token)=>{
    const toastId=toast.loading('Adding customer')
    console.log("Adding Customers");
    try{
        let result;
        const response=await apiConnector('POST', Customers.ADD_CUSTOMER_API,customerData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result=response?.data?.customer
        toast.success("Added customer successfully")
        return result
    }
    catch(error){
        const errorMessage = error?.response?.data?.message || "Failed add customer";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const updateCustomer=async(dispatch,updatedData,token)=>{
    const toastId=toast.loading('Updating customer')
    try{
        let result;
        const response=await apiConnector('PUT', Customers.UPDATE_CUSTOMER_API,updatedData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result=response?.data?.customer
        console.log(response?.data?.customer);
        toast.success("Updated customer successfully")
        return result
    }
    catch(error){
        const errorMessage = error?.response?.data?.message || "Failed to update customer";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const deleteCustomerData=async(dispatch,id,token)=>{
    const toastId=toast.loading('Deleting Customer')
    console.log("id is ",id);
    
    try{
        const response=await apiConnector('DELETE', `${Customers.DELETE_CUSTOMER_API}/${id}`,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.customers);
    
        dispatch(setCustomers(response.data.customers))
        toast.success("Deleted customer successfully")
    }
    catch(error){
        console.log("deletion error",error);
        
        const errorMessage = error?.response?.data?.message || "Failed to delete customer";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}