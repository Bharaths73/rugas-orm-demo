import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable';
import axios from 'axios';
import { getAllCustomers } from '@/Services/operations/CustomersApi';
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



function Customers() {
  const dispatch=useDispatch()
  // const [customers,setCustomers] = useState([])
  const {customers}=useSelector((state)=>state.customers)

  const getCustomers= async()=>{
    await getAllCustomers(dispatch);
  }

  useEffect(()=>{
     getCustomers()
  },[])

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5">
        <div className="w-full h-16">
          <Dialog>
            <DialogTrigger className='bg-black text-white py-2 px-5 border-black rounded-md cursor-pointer'>New Customer</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='text-center text-2xl'>Enter Customer Details</DialogTitle>
              </DialogHeader>
              <form>
                 <div className='flex flex-col gap-y-5 mt-2'>
                   <Input placeholder='Enter Name' type='text' name='name' required/>
                   <Input placeholder='Enter Email' type='mail' name='email' required/>
                   <Input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" pattern="[0-9]{10}" required/>
                   <Input placeholder='Enter Address' type='text' name='address' required/>
                   <Button className='' type='submit'>Save</Button>
                 </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {customers.length > 0 ? (
          <DataTable
            head={Object.keys(customers[0])}
            body={customers}
            tableName="Customers"
          />
        ) : (
          <div className="w-full flex justify-center text-3xl">
            No Customers Available
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers