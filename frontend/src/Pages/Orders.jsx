import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, orderStatus } from '@/Utils/products'
import { addProduct, getAllProducts } from '@/Services/operations/ProductsApi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import DataTable from '@/components/common/DataTable'
import SelectComponent from '@/components/common/SelectComponent'
import { addOrder, getAllOrders } from '@/Services/operations/OrdersApi'
import { getAllCustomers } from '@/Services/operations/CustomersApi'

function Orders() {
  const dispatch=useDispatch()
  const [loading,setLoading] = useState(false)
  const {products}=useSelector((state)=>state.products)
  const {orders}=useSelector((state)=>state.orders)
  const {customers}=useSelector((state)=>state.customers)
  const [openForm, setOpenForm]=useState(false)
  const {register,reset,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful,isSubmitting}}=useForm()
  
  const getOrders= async()=>{
      setLoading(true)
      await getAllOrders(dispatch);
      setLoading(false)
  }
  
  const submitHandler=async(data)=>{
        await addOrder(dispatch,data)
        setOpenForm(false)
  }

  const getData=async()=>{
     await getAllCustomers(dispatch)
     await getAllProducts(dispatch)
  }

  useEffect(()=>{
     if(openForm){
       getData()
     }
  },[openForm])

  useEffect(()=>{
     getOrders()
     if(isSubmitSuccessful){
      reset({
        customer:"",
        product:"",
        quantity:"",
        status:"",
      })
   }
  },[dispatch,isSubmitSuccessful])

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5">
        <div className="w-full h-16">
          <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger className="bg-black text-white py-2 px-5 border-black rounded-md cursor-pointer">
              New Order
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Enter Order Details
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-y-5 mt-2">
                  <SelectComponent register={register} data={customers} type='customer' setValue={setValue}/>
                  <SelectComponent register={register} data={products} type='product' setValue={setValue}/>
                  <Input
                    placeholder="Enter Quantity"
                    type="number"
                    name="quantity"
                    {...register("quantity", {
                      required: true,
                      valueAsNumber:true,
                      min: { value: 1, message: "Quantity should be more than 0" },
                    })}
                    min={1}
                    required
                  />
                  {errors.stock && <div>{errors.stock.message}</div>}
                  <SelectComponent register={register} data={orderStatus} type='status' setValue={setValue}/>
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
          orders.length > 0 ? (
            <DataTable
              head={Object.keys(orders[0])}
              body={orders}
              tableName="Products"
            />
          ) : (
            <div className="w-full flex justify-center text-3xl">
              No Orders Available
            </div>
          )
        ) : (
          <div className="w-full flex justify-center text-3xl">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Orders