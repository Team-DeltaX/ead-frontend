import React from 'react'
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from "../ui/label";
import {Button} from '../ui/button';
import { CirclePlus } from 'lucide-react';

function NewAddressDialog() {
  
    return (
        <Dialog>
          <DialogTrigger asChild>
          <button><CirclePlus></CirclePlus></button>
          </DialogTrigger>
          <DialogContent className="w-[300px] sm:w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new Address</DialogTitle>
              <DialogDescription>
                Make sure to Add valid address. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Address
                </Label>
                <Input
                  id="username"
                  defaultValue="GalleRoad,Katubedda"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Phone
                </Label>
                <Input
                  id="username"
                  defaultValue="0112256475"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add New</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
  
}

export default NewAddressDialog