import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const OrderStatusSelect = () => {
  
    return (
        <Select >
        <SelectTrigger className="w-[180px] appearance-none text-white min-w-[120px] py-2 pl-4 pr-8 rounded-full shadow-lg  transition-all duration-300 ease-in-out text-xs focus:outline-none capitalize">
            <SelectValue placeholder="processing" />
        </SelectTrigger>
        <SelectContent >
            <SelectGroup>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
    )
    }
  export { OrderStatusSelect }