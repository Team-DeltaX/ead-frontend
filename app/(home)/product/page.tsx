import { Product, productService } from '@/services/product.service'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [data, setData] = useState<Product[]>()

  const fetchData = async () =>{
     const data = await productService.getAllProducts()
     setData(data);
  }


  useEffect(() => {
   fetchData()
  }, [])
  

  return (
    <div>Page</div>
  )
}

export default Page