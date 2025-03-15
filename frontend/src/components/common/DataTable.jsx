import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function DataTable({head,body,tableName,editData,deleteData,setOpenForm,openForm,setEditForm}) {
  console.log(head);

  const editFormHandler=(data)=>{
      setEditForm(data)
      editData(data)
  }

  return (
    <Table className="border border-gray-300 border-collapse -z-50">
      <TableCaption>List of {tableName}</TableCaption>
      <TableHeader>
        <TableRow className="border border-gray-300">
          {head
            .filter((header) => header !== "_id")
            .flatMap((header, index) =>
              header === "customerId"
                ? [
                    <TableHead
                      key={index}
                      className="text-center font-bold border border-gray-300 text-black text-base"
                    >
                      Customer Name
                    </TableHead>,
                    <TableHead
                      key={`${index}-email`}
                      className="text-center font-bold border border-gray-300 text-black text-base"
                    >
                      Customer Email
                    </TableHead>
                  ]
                : [
                    <TableHead
                      key={index}
                      className="text-center font-bold border border-gray-300 text-black text-base"
                    >
                      {header==="productId" ? header.slice(0,7):header.charAt(0).toUpperCase() + header.slice(1)}
                    </TableHead>
                  ]
            )}
            <TableHead className="text-center font-bold border border-gray-300 text-black text-base">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {body.map((data, index) => (
          <TableRow key={index}>
            {Object.entries(data)
              .filter(([key]) => key !== "_id")
              .map(([k, value], index) => (
                <React.Fragment key={index}>
                  <TableCell
                    className="font-medium text-center border border-gray-300"
                  >
                    {k === "image" ? (
                      <img
                        src={value}
                        width={70}
                        height={70}
                        className="mx-auto"
                      />
                    ) : k === "customerId" || k === "productId" ? (
                      value?.name
                    ) : (
                      value
                    )}
                  </TableCell>
                  {k === "customerId" && (
                    <TableCell
                      className="font-medium text-center border border-gray-300"
                    >
                      {value?.email}
                    </TableCell>
                  )}
                </React.Fragment>
              ))}
              <TableCell className="font-medium text-center flex justify-center gap-x-10 p-5">
                  <MdModeEdit className='text-3xl text-black cursor-pointer' onClick={() => !openForm && editFormHandler(data)}/>
                  <MdDeleteForever className='text-3xl text-red-600 cursor-pointer' onClick={()=>deleteData(data._id)}/>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable