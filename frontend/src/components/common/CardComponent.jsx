import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '../ui/button';
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
  

function CardComponent({image,name,description,price,stock,deleteProduct}) {
  return (
    <Card className='flex flex-col px-1 gap-y-3 bg-gray-100 shadow-black shadow-xl rounded-2xl border-gray-100 border-4 drop-shadow-xl hover:bg-white hover:border-white cursor-pointer aspect-[16/9]'>
        <img src={image} alt={name} className='w-full h-full md:h-32 lg:h-40 mx-auto object-contain mb-2'/>
      <CardHeader>
        <CardTitle>{name.toUpperCase()}</CardTitle>
        <CardDescription className='line-clamp-1'>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex gap-x-2'>
        <span className='font-bold'>Stock: </span><p>{stock}</p>
      </CardContent>
      <CardContent className='flex gap-x-2'>
      <span className='font-bold'>Price: </span><p>{price}</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-x-2 mt-1'>
        <Button onClick={null} className='text-sm py-3 px-7 cursor-pointer'>Edit <MdModeEdit/></Button>
        <Button onClick={deleteProduct} className='text-sm py-3 px-7 cursor-pointer'>Delete <MdDeleteForever/></Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent