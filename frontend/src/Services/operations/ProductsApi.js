import toast from "react-hot-toast";
import { Products } from "../Api";
import { setProducts } from "@/Slices/productsSlice";
import { apiConnector } from "../ApiConnector";
const FILE_URL = import.meta.env.VITE_APP_FILE_URL;
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGg3c21zQGdtYWlsLmNvbSIsImlkIjoiNjdkMjdkNDJkODQxYmExZTUwMmEzOGVhIiwiaWF0IjoxNzQyMDI1MjYxLCJleHAiOjE3NDIxMTE2NjF9.HdTJJrA6ku9-jScUFqZUSFA-N0obTy7ZV--GHaId4Zc"

export const getAllProducts=async(dispatch)=>{
    const toastId=toast.loading('Getting all products')
    
    try{
        const response=await apiConnector('GET', Products.GET_ALL_PRODUCTS_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.products);

        // Mapping through products array and updating the image URL
        const updatedProducts = response.data.products.map((product) => ({
            ...product,
            image: product?.image && `${FILE_URL + product.image}`
        }));
        dispatch(setProducts(updatedProducts))
        toast.success("Fetched products successfully")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed to get all products";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const addProduct=async(dispatch,productData)=>{
    const toastId=toast.loading('Adding product')
    console.log("Adding Product");
    try{
        const response=await apiConnector('POST', Products.ADD_PRODUCT_API,productData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        // console.log(response.data.customers);
    
        // dispatch(setCustomers(response.data.customers))
        toast.success("Added product successfully")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed add product";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const deleteProductData=async(dispatch,id)=>{
    const toastId=toast.loading('Deleting Product')
    console.log("id is ",id);
    
    try{
        const response=await apiConnector('DELETE', `${Products.DELETE_PRODUCT_API}/${id}`,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response.data.products);
    
        dispatch(setCustomers(response.data.products))
        toast.success("Deleted product successfully")
    }
    catch(error){
        console.log("deletion error",error);
        
        const errorMessage = error?.response?.data?.message || "Failed to delete product";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}