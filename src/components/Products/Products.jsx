import axios from 'axios'
import { Input, Tooltip } from '@nextui-org/react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import IconWishlist from "../IconWishlist/IconWishlist"
import IconCart from "../IconCart/IconCart"
import {  useState } from "react"

export default function Products() {
    const [Products, setProducts] = useState(null) 
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    const {data , isLoading , isError , error } = useQuery({
        queryKey:"allProduct",
        queryFn:getProducts,
        staleTime:60000 * 3
    })
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <>
        <h2>{error}</h2>
        </>
    }
    
    
    
return (
    <>
        <Helmet>
                    <title>Products</title>
        </Helmet>
        <Input
                type="text"
                label="Product Name"
                labelPlacement="outside"
                className="w-1/2 md:w-1/3 lg:w-1/4 ml-auto"
                variant="bordered"
                color="secondary"
                endContent={
                    <i className="fa-solid fa-magnifying-glass text-[#9c34c2] text-2xl  pointer-events-none flex-shrink-0"></i>
                }
                onInput={(e)=>{
                    console.log(e.target.value);
                    if(e.target.value !== ""){
                    setProducts(data.data.data.filter((x)=>x.title.toLowerCase().includes(e.target.value.toLowerCase())))
                    console.log(Products);
                    }else{
                        setProducts(null)
                    }
                    
                    
                }}
            />
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2 relative mt-7'>
        {Products==null ? data.data.data.map((proudct)=>
            <div key={proudct._id} className='product p-2 group overflow-hidden border rounded-lg'>
                <Tooltip content={ ` In Stock : ${proudct.quantity}`} placement='top' offset={-7} showArrow={true} color='secondary'>
                <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <IconWishlist   id={proudct._id} />
                    
                    <p className=" absolute bottom-0 left-0">{proudct.ratingsAverage} <i className='fa-solid fa-star text-[#9c34c2]'></i> ({proudct.ratingsQuantity}) </p>
                </div>
                </Tooltip>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-[#9c34c2] mt-2'>{proudct.category.name}</h6>
                <p className="dark:text-slate-100">{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between dark:text-slate-100'>
                    <p className='mt-2'><span>EGP</span> <span>{proudct.priceAfterDiscount} </span> <span className={proudct.priceAfterDiscount?'line-through text-gray-300 dark:text-slate-400':''}>{proudct.price}</span> {proudct.priceAfterDiscount?<span className=' text-[#9c34c2]'>{100-Math.ceil(proudct.priceAfterDiscount/proudct.price*100)}%</span> : ""}</p>
                </div>
                <div className=" flex items-center justify-center mt-4">
                    <IconCart id={proudct._id} />
                </div>
                
            </div>
            
        ):Products.map((proudct)=>
            <div key={proudct._id} className='product p-2 group overflow-hidden border rounded-lg'>
                <Tooltip content={ ` In Stock : ${proudct.quantity}`} placement='top' offset={-7} showArrow={true} color='secondary'>
                <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <IconWishlist   id={proudct._id} />
                    
                    <p className=" absolute bottom-0 left-0">{proudct.ratingsAverage} <i className='fa-solid fa-star text-[#9c34c2]'></i> ({proudct.ratingsQuantity}) </p>
                </div>
                </Tooltip>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-[#9c34c2] mt-2'>{proudct.category.name}</h6>
                <p className="dark:text-slate-100">{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between dark:text-slate-100'>
                    <p className='mt-2'><span>EGP</span> <span>{proudct.priceAfterDiscount} </span> <span className={proudct.priceAfterDiscount?'line-through text-gray-300 dark:text-slate-400':''}>{proudct.price}</span> {proudct.priceAfterDiscount?<span className=' text-[#9c34c2]'>{100-Math.ceil(proudct.priceAfterDiscount/proudct.price*100)}%</span> : ""}</p>
                </div>
                <div className=" flex items-center justify-center mt-4">
                    <IconCart id={proudct._id} />
                </div>
                
            </div>
            
        )}
    </div>
    </>
)
}
