import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Controller } from 'react-hook-form';

function SelectComponent({control,type,data,name,value}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select value={name === "status" ? field.value : field.value?._id || ""} onValueChange={(value) => {
          if (name === "status") {
            field.onChange(value);
          } else {
            const selectedItem = data.find((item) => item._id === value);
            field.onChange(selectedItem);
          }
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${type}`} />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item._id || item.id} value={item._id || item.status}>
                 {item.name || item.status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

export default SelectComponent