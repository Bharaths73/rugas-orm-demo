import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function SelectComponent({register,type,data,setValue}) {
  return (
    <Select
      {...register(type)}
      onValueChange={(value) => setValue(type, value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${type}`} />
      </SelectTrigger>
      <SelectContent>
        {data.map((element, index) => (
          <SelectItem key={element.id || element._id} value={type==='status'? element.status:(type==='category' ? element.name : element._id)}>
            {type==='status'? element.status:element.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectComponent