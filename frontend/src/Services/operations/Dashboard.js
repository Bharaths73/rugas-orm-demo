import toast from "react-hot-toast";
import { Dashboard } from "../Api";
import { apiConnector } from "../ApiConnector";

export const getDashboardDetailsBackend=async(token)=>{
    const toastId=toast.loading('Getting Details')
    try{
        let result=[]
        const response=await apiConnector('GET', Dashboard.Dashboard_Details_API,null,{Authorization:`Bearer ${token}`,withCredentials:true})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        // console.log(response.data.dashboardDetails);

        toast.success("Fetched details successfully")
        return response?.data?.dashboardDetails
    }
    catch(error){
        const errorMessage = error?.response?.data?.message || "Failed to get details";

        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId)
    }
}