import toast from "react-hot-toast";
import { Products } from "../Api";
import { setProducts } from "@/Slices/productsSlice";
import { apiConnector } from "../ApiConnector";
const FILE_URL = import.meta.env.VITE_APP_FILE_URL;

export const getAllProducts=async(dispatch,token)=>{
    // console.log("token",token)
    const toastId=toast.loading('Getting all products')
    
    try{
        const response=await apiConnector('GET', Products.GET_ALL_PRODUCTS_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        // console.log(response.data.products);

        const updatedProducts = response.data.products.map((product) => ({
            ...product,
            image: product?.image && `${FILE_URL + product.image}`
        }));
        dispatch(setProducts(updatedProducts))
        toast.success("Fetched products successfully")
    }
    catch(error){
        // console.log(error);
    
        const errorMessage = error?.response?.data?.message || "Failed to get all products";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const addProduct=async(dispatch,productData,token)=>{
    const toastId=toast.loading('Adding product')
    // console.log("Adding Product");
    try{
        let result;
        const response=await apiConnector('POST', Products.ADD_PRODUCT_API,productData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response?.data?.product
        toast.success("Added product successfully")
        return result
    }
    catch(error){
        // console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed add product";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const deleteProductData=async(dispatch,id,token)=>{
    const toastId=toast.loading('Deleting Product')
    // console.log("id is ",id);
    
    try{
        const response=await apiConnector('DELETE', `${Products.DELETE_PRODUCT_API}/${id}`,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        // console.log(response.data.products);
    
        const updatedProducts = response.data.products.map((product) => ({
            ...product,
            image: product?.image && `${FILE_URL + product.image}`
        }));
        dispatch(setProducts(updatedProducts))
        toast.success("Deleted product successfully")
    }
    catch(error){
        // console.log("deletion error",error);
        
        const errorMessage = error?.response?.data?.message || "Failed to delete product";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const updateProduct=async(dispatch,productData,token)=>{
    const toastId=toast.loading('Updating Product')
    try{
        let result;
        const response=await apiConnector('PUT', Products.UPDATE_PRODUCT_API,productData,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result=response?.data?.product
        toast.success("Updated product successfully")
        return result
    }
    catch(error){
        // console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed to update product";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}