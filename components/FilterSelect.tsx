import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const FilterSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]  py-1 border border-gray-500 rounded-sm focus:outline-none focus-visible:outline-none focus:ring-0 mr-10"
        style={{ outline: 'none', boxShadow: 'none !important' }}>
        <SelectValue placeholder="Filter By Category" className='text-center'/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
          <SelectItem value="apple">Phones</SelectItem>
          <SelectItem value="banana">Laptops</SelectItem>
          <SelectItem value="blueberry">Cameras</SelectItem>
          <SelectItem value="grapes">Watches</SelectItem>
          <SelectItem value="pineapple">Headphones</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterSelect