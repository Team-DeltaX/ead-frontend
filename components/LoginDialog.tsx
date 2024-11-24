import React from 'react'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

const LoginDialog = () => {
  return (
      <Dialog>
          <DialogTrigger asChild>
              <Button className="rounded-md  px-8 py-1.5 hover:bg-gray-700 hover:text-white bg-black text-white font-SFPro md:text-[14px] text-[10px]">
                  
              </Button>
          </DialogTrigger>
    </Dialog>
  )
}

export default LoginDialog