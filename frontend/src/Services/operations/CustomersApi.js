import toast from "react-hot-toast"
import { Customers } from "../Api"
import { apiConnector } from "../ApiConnector"
import { setCustomers } from "@/Slices/customersSlice"

export const getAllCustomers=async(dispatch,token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGg3c21zQGdtYWlsLmNvbSIsImlkIjoiNjdkMjdkNDJkODQxYmExZTUwMmEzOGVhIiwiaWF0IjoxNzQxODUyMDk4LCJleHAiOjE3NDE5Mzg0OTh9.7FEZMSld-Y7L4P-N26NLXumocejc-ssh7IDsqcyk89c")=>{
    const toastId=toast.loading('Getting all customers')
    try{
        // let result=[]
        const response=await apiConnector('GET', Customers.GET_ALL_CUSTOMERS_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.customers);
    
        dispatch(setCustomers(response.data.customers))
    }
    catch(error){
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to get all customers";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}