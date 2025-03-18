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
import { addProduct, deleteProductData, getAllProducts, updateProduct } from '@/Services/operations/ProductsApi'
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
import toast from 'react-hot-toast'


function Products() {
  const dispatch=useDispatch()
  const [loading,setLoading] = useState(false)
  const {products}=useSelector((state)=>state.products)
  const [openForm, setOpenForm]=useState(false)
  const [editForm,setEditForm]=useState(null)
  const[error,setError]=useState(false)
  const token=useSelector((state)=>state.auth.token)
  const {control,register,reset,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful,isSubmitting}}=useForm({
    defaultValues: {
      name: "",
      description: "",
      stock: "",
      price: "",
      category: "",
      image: null, 
    },
  })
  
  const getProducts= async()=>{
      setLoading(true)
      await getAllProducts(dispatch,token);
      setLoading(false)
  }
  
  const submitHandler=async(data)=>{
    let result;
    const formData=new FormData()
    if(editForm){
      const newData=getValues();
      if(editForm.name===newData.name && editForm.description===newData.description && editForm.stock===newData.stock && editForm.price===newData.price && editForm.category===newData.category && !(newData.image instanceof File)){
        toast("No changes made")
        reset()
        setEditForm(null)
        setOpenForm(false)
        return
      }
      newData._id = editForm.id;
      
      if (newData.image instanceof File) {
        formData.append("image", newData.image); 
      }
      formData.append("productInfo",JSON.stringify(newData))
      result=await updateProduct(dispatch,formData,token)
    }
    
    else{
    formData.append("image",data.image)
    formData.append("productInfo",JSON.stringify(data))
    result=await addProduct(dispatch,formData,token)
    }
    if(!result){
      setError(true)
    }
    else{
      setError(false)
      getProducts()
    }
    reset()
    setEditForm(null)
    setOpenForm(false)
  }

  const imageHandler=(e)=>{
    setValue("image",e.target.files[0])
  }

  const deleteProduct=async(id)=>{
    await deleteProductData(dispatch,id,token)
  }

  const editProduct=(data)=>{
    setValue("name",data.name);
    setValue("description",data.description);
    setValue("stock",data.stock);
    setValue("price",data.price)
    setValue("category",data.category)
    setOpenForm(true);
}

  useEffect(()=>{
    if(!error){
      getProducts()
    }
  },[dispatch])

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5">
        <div className="w-full h-16">
          <Dialog open={openForm} onOpenChange={(isOpen) => {
              setOpenForm(isOpen);
              if (!isOpen) {
                setEditForm(null);
                reset({
                  name: "",
                  description: "",
                  stock: "",
                  price: "",
                  category:""
                });
              }
            }}>
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

                  <SelectComponent
                    control={control}
                    name="category"
                    data={categories}
                    type="category"
                  />

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
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  category={product.category}
                  deleteProduct={()=>deleteProduct(product._id)}
                  editData={editProduct}
                  setOpenForm={setOpenForm}
                  openForm={openForm}
                  setEditForm={setEditForm}
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