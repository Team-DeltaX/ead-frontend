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

export function Sortby() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="font-semibold" placeholder="Sort by : " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="date">Sort by: <span className="font-semibold">Date</span> </SelectItem>
          <SelectItem value="amount">Sort by: <span className="font-semibold"> Amount</span></SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
