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
import { categories } from '@/Utils/products'
import { addProduct, deleteProductData, getAllProducts } from '@/Services/operations/ProductsApi'
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
import CardComponent from '@/components/common/CardComponent'


function Products() {
  const dispatch=useDispatch()
  const [loading,setLoading] = useState(false)
  const {products}=useSelector((state)=>state.products)
  const [openForm, setOpenForm]=useState(false)
  const {register,reset,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful,isSubmitting}}=useForm()
  
  const getProducts= async()=>{
      setLoading(true)
      await getAllProducts(dispatch);
      setLoading(false)
  }
  console.log("products are",products);
  
  const submitHandler=async(data)=>{
    console.log("form data",data);
    
    const formData=new FormData()
    formData.append("image",data.image)
    formData.append("productInfo",JSON.stringify(data))
    console.log(data.image);
    await addProduct(dispatch,formData)
    setOpenForm(false)
  }

  const imageHandler=(e)=>{
    setValue("image",e.target.files[0])
  }

  const deleteProduct=async(id)=>{
    await deleteProductData(dispatch,id)
  }

  useEffect(()=>{
     getProducts()
     if(isSubmitSuccessful){
      reset({
        name:"",
        category:"",
        description:"",
        image:"",
        price:0,
        stock:0
      })
   }
  },[dispatch,isSubmitSuccessful])

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5">
        <div className="w-full h-16">
          <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger className="bg-black text-white py-2 px-5 border-black rounded-md cursor-pointer">
              New Product
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Enter Product Details
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-y-5 mt-2">
                  <Input
                    placeholder="Enter Product Name"
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    required
                  />
                  <Input
                    placeholder="Enter Description"
                    type="text"
                    name="description"
                    {...register("description", { required: true })}
                    required
                  />
                  <SelectComponent register={register} data={categories} type='category' setValue={setValue}/>

                  <Input id="picture" type="file" onChange={imageHandler}/>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter Price"
                    {...register("price", { required: true,valueAsNumber:true })}
                    required
                  />
                  <Input
                    placeholder="Enter Stock"
                    type="number"
                    name="stock"
                    {...register("stock", {
                      required: true,
                      valueAsNumber:true,
                      min: { value: 0, message: "Stock should be more than 0" },
                    })}
                    min={1}
                    required
                  />
                  {errors.stock && <div>{errors.stock.message}</div>}
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
          products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {products.map((product) => (
                <CardComponent
                  key={product._id}
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  deleteProduct={()=>deleteProduct(product._id)}
                />
              ))}
              </div>
          ) : (
            <div className="w-full flex justify-center text-3xl">
              No Products Available
            </div>
          )
        ) : (
          <div className="w-full flex justify-center text-3xl">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Products