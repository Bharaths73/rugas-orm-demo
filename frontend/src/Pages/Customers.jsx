import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable';
import axios from 'axios';
import { addCustomer, deleteCustomerData, getAllCustomers, updateCustomer } from '@/Services/operations/CustomersApi';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';



function Customers() {
  const dispatch=useDispatch()
  const [loading,setLoading] = useState(false)
  const {customers}=useSelector((state)=>state.customers)
  const token=useSelector((state)=>state.auth.token)
  const [openForm, setOpenForm]=useState(false)
  const [editForm,setEditForm]=useState(null)
  const [error,setError]=useState(false)
  const {register,reset,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful,isSubmitting}}=useForm()
  
  const getCustomers= async()=>{
      setLoading(true)
      await getAllCustomers(dispatch,token);
      setLoading(false)
  }
  const submitHandler=async(data)=>{
      if(editForm){
        const newData=getValues();
        if(editForm.name===newData.name && editForm.email===newData.email && editForm.phone===newData.phone && editForm.address===newData.address)
        {
          toast("No changes made")
          setEditForm(null)
          setOpenForm(false)
          return
        }
        newData._id=editForm._id
        let result=await updateCustomer(dispatch,newData,token)
        if(!result){
          setError(true)
        }
        else{
          setError(false)
        }
        setEditForm(null)
        setOpenForm(false)
      }
      else{
        let result=await addCustomer(dispatch,data,token)
        if(!result){
          setError(true)
        }
        else{
          setError(false)
        }
        setOpenForm(false)
      }
  }

  const deleteCustomer=async(id)=>{
       await deleteCustomerData(dispatch,id,token)
  }

  const editCustomer=(data)=>{
      setValue("name",data.name);
      setValue("email",data.email);
      setValue("phone",data.phone);
      setValue("address",data.address)
      setOpenForm(true);
  }

  useEffect(()=>{
     if(!error){
      getCustomers()
     }
     if(isSubmitSuccessful){
      reset({
        name:"",
        email:"",
        phone:"",
        address:""
      })
   }
  },[dispatch,isSubmitSuccessful])

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5">
        <div className="w-full h-16">
          <Dialog
            open={openForm}
            onOpenChange={(isOpen) => {
              setOpenForm(isOpen);
              if (!isOpen) {
                setEditForm(null);
                reset({
                  name: "",
                  email: "",
                  phone: "",
                  address: ""
                })
              }
            }}
          >
            <DialogTrigger className="bg-black text-white py-2 px-5 border-black rounded-md cursor-pointer">
              New Customer
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Enter Customer Details
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-y-5 mt-2">
                  <Input
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    required
                  />
                  <Input
                    placeholder="Enter Email"
                    type="mail"
                    name="email"
                    {...register("email", { required: true })}
                    required
                  />
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone Number"
                    pattern="[0-9]{10}"
                    {...register("phone", { required: true })}
                    required
                  />
                  <Input
                    placeholder="Enter Address"
                    type="text"
                    name="address"
                    {...register("address", { required: true })}
                    required
                  />
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {!loading ? (
          customers.length > 0 ? (
            <DataTable
              head={Object.keys(customers[0])}
              body={customers}
              tableName="Customers"
              deleteData={deleteCustomer}
              editData={editCustomer}
              setOpenForm={setOpenForm}
              openForm={openForm}
              setEditForm={setEditForm}
            />
          ) : (
            <div className="w-full flex justify-center text-3xl">
              No Customers Available
            </div>
          )
        ) : (
          <div className="w-full flex justify-center text-3xl">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Customers