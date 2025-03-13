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

function DataTable({head,body,tableName}) {
  console.log(head);
  return (
    <Table className="border border-gray-300 border-collapse">
      <TableCaption>List of {tableName}</TableCaption>
      <TableHeader>
        <TableRow className="border border-gray-300">
          {head
            .filter((header) => header !== "_id") 
            .map((header, index) => (
              <TableHead
                key={index}
                className="text-center font-bold border border-gray-300 text-black text-base"
              >
                {header.charAt(0).toUpperCase()+ header.slice(1)}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {body.map((data, index) => (
          <TableRow key={index}>
            {Object.entries(data)
              .filter(([key]) => key !== "_id") 
              .map(([_, value], index) => (
                <TableCell
                  key={index}
                  className="font-medium text-center border border-gray-300"
                >
                  {value}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable