import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
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
import { addOrder, deleteOrderData, getAllOrders, updateOrder } from '@/Services/operations/OrdersApi'
import { getAllCustomers } from '@/Services/operations/CustomersApi'
import toast from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function Orders() {
  const dispatch=useDispatch()
  const [loading,setLoading] = useState(false)
  const {products}=useSelector((state)=>state.products)
  const {orders}=useSelector((state)=>state.orders)
   const token=useSelector((state)=>state.auth.token)
  const {customers}=useSelector((state)=>state.customers)
  const [openForm, setOpenForm]=useState(false)
  const [editForm,setEditForm]=useState(null)
  const [error,setError]=useState(false)
  const[filterData,setFilterData]=useState("all")
  const {control, register,reset,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful,isSubmitting}}=useForm()
  
  const getOrders= async()=>{
      setLoading(true)
      await getAllOrders(dispatch,token);
      setLoading(false)
  }
  
  const submitHandler=async(data)=>{
    let result;
        if(editForm){
           const newData=getValues();
          if(editForm.customerId._id===newData.customer._id && editForm.productId._id===newData.product._id && editForm.quantity===newData.quantity && editForm.status===newData.status){
            toast("No changes made")
            reset()
            setEditForm(null)
            setOpenForm(false)
            return
          }
          newData._id = editForm._id;
          result=await updateOrder(dispatch, newData,token);
        }
        else{
          result=await addOrder(dispatch,data,token)
        }
        if(!result){
          setError(true)
        }
        else{
          setError(false)
          getOrders()
        }
        reset()
        setEditForm(null);
        setOpenForm(false);
        
  }

  const getData=async()=>{
     await getAllCustomers(dispatch,token)
     await getAllProducts(dispatch,token)
  }

  const deleteOrder=async(id)=>{
       await deleteOrderData(dispatch,id,token)
    }

  const editOrder=(data)=>{
    
    setValue("customer",data.customerId);
    setValue("product",data.productId);
    setValue("quantity",data.quantity);
    setValue("status",data.status)
    setOpenForm(true);
}

  useEffect(()=>{
     if(openForm){
       getData()
     }
  },[openForm])

  useEffect(()=>{
     if(!error){
      getOrders()
     }
  },[])

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5">
        <div className="w-full h-16 flex justify-between gap-x-2">
          <Dialog
            open={openForm}
            onOpenChange={(isOpen) => {
              setOpenForm(isOpen);
              if (!isOpen) {
                setEditForm(null);
                reset({
                  customer: "",
                  product: "",
                  quantity: "",
                  status: "",
                });
              }
            }}
          >
            <DialogTrigger className="bg-black text-white h-10 w-32 border-black rounded-md cursor-pointer">
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
                  <SelectComponent
                    control={control}
                    name="customer"
                    data={customers}
                    type="customer"
                  />
                  <SelectComponent
                    control={control}
                    name="product"
                    data={products}
                    type="product"
                  />
                  <Input
                    placeholder="Enter Quantity"
                    type="number"
                    name="quantity"
                    {...register("quantity", {
                      required: true,
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Quantity should be more than 0",
                      },
                    })}
                    min={1}
                    required
                  />
                  {errors.stock && <div>{errors.stock.message}</div>}
                  <SelectComponent
                    control={control}
                    name="status"
                    data={orderStatus.filter(status=>status.status!=="all")}
                    type="status"
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

          <Select value={filterData} onValueChange={(value)=>setFilterData(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
               {
                 orderStatus.map((status,index)=>(
                  <SelectItem value={status.status} key={index}>{status.status}</SelectItem>
                 ))
               }
            </SelectContent>
          </Select>
        </div>
        {!loading ? (
          orders.length > 0 ? (
            <DataTable
              head={Object.keys(orders[0])}
              body={filterData!=="all" ? orders.filter(order=>order.status===filterData) : orders}
              tableName="Products"
              deleteData={deleteOrder}
              editData={editOrder}
              setOpenForm={setOpenForm}
              openForm={openForm}
              setEditForm={setEditForm}
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