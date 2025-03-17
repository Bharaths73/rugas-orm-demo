import toast from "react-hot-toast";
import { Auth } from "../Api";
import { setToken, setUser } from "@/Slices/AuthSlice";
import { apiConnector } from "../ApiConnector";

export const signup=async(dispatch,data,navigate)=>{
    const toastId=toast.loading('Creating your account')
    try{
        const response=await apiConnector('POST', Auth.SIGNUP_API,data)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response?.data?.user);
    
        dispatch(setUser(response?.data?.user))
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('user', JSON.stringify(response?.data?.user))
        localStorage.setItem('token', JSON.stringify(response?.data?.token))
        navigate('/dashboard')
        toast.success("Created your account")
    }
    catch(error){
        console.log(error);
        const errorMessage = error?.response?.data?.message || "Failed to create your account";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const login=async(dispatch,data,navigate)=>{
    const toastId=toast.loading('Logging in')
    try{
        const response=await apiConnector('POST', Auth.LOGIN_API,data)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log(response?.data?.user);
    
        dispatch(setUser(response?.data?.user))
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('user', JSON.stringify(response?.data?.user))
        localStorage.setItem('token', JSON.stringify(response?.data?.token))
        navigate('/dashboard')
        toast.success("Login successful!")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed logging";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const logout=async(dispatch,navigate,token)=>{
    const toastId=toast.loading('Logging out')
    try{
        const response=await apiConnector('POST', Auth.LOGOUT_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
    
        dispatch(setUser(undefined))
        dispatch(setToken(undefined))
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
        toast.success("Logout successful!")
    }
    catch(error){
        console.log(error);
        
        const errorMessage = error?.response?.data?.message || "Failed logout";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}