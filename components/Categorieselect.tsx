import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const  SelectCategory = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Smartphone</SelectItem>
          <SelectItem value="banana">Laptop</SelectItem>
          <SelectItem value="blueberry">Headphones</SelectItem>
          <SelectItem value="grapes">Speakers</SelectItem>
          <SelectItem value="pineapple">Accessories</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectCategory

const BrandSelect = () => {
    return (
        <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="samsung">Samsung</SelectItem>
            <SelectItem value="dell">Dell</SelectItem>
            <SelectItem value="hp">HP</SelectItem>
            <SelectItem value="sony">Sony</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
    )
    }

export { BrandSelect }
