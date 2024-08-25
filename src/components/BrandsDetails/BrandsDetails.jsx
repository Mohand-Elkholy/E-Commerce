import React, { useContext } from 'react'
import styles from "./BrandsDetails.module.css"
import axios from 'axios'
import { Tooltip } from '@nextui-org/react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Helmet } from "react-helmet"
import { Link, useParams } from "react-router-dom"
import IconWishlist from "../IconWishlist/IconWishlist"
import oops from "../../assets/—Pngtree—oops text effect speech bubbles_6289883.png"
import IconCart from '../IconCart/IconCart'
export default function BrandsDetails() {
    const {name} = useParams()

    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    const {data , isLoading , isError , error } = useQuery({
        queryKey:["allProduct" , name],
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
    const filteredData = data?.data.data.filter((proudct)=>proudct.brand.name == name)
return (
    <>
    <Helmet>
                    <title>Brand Details</title>
        </Helmet>
        {filteredData.length == 0 ? <div className='flex items-center justify-center flex-col'>
            <img src={oops} alt="oops" className='w-[300px]' />
            <h2 className=' mt-4 dark:text-slate-100 text-sm md:text-lg lg:text-2xl'>There is no products in {name} Brand</h2>
            <Link to={"/Brands"} className='btn p-2 mt-5 text-sm md:text-lg'>Go Back To Brands</Link>
        </div> : <>
            <h2 className='text-3xl text-center text-[#9c34c2] capitalize mb-7'> {name}</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2'>
        {filteredData.map((proudct)=>
            <div key={proudct._id} className='product p-2 group overflow-hidden border rounded-lg'>
                <Tooltip content={ ` In Stock : ${proudct.quantity}`} placement='top' offset={-7} showArrow={true} color='secondary'>
                <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <IconWishlist   id={proudct._id} data={data}/>
                    <p className=" absolute bottom-0 right-0 text-sm md:text-base">{proudct.ratingsAverage} <i className='fa-solid fa-star text-[#9c34c2]'></i> ({proudct.ratingsQuantity}) </p>
                </div>
                </Tooltip>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-[#9c34c2] mt-2 text-base md:text-lg'>{proudct.category.name}</h6>
                <p className='dark:text-slate-100 text-sm md:text-base'>{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between'>
                    <p className='mt-2 dark:text-slate-100 text-sm md:text-base'><span>EGP</span> <span>{proudct.priceAfterDiscount} </span> <span className={proudct.priceAfterDiscount?'line-through text-gray-300 dark:text-slate-400':''}>{proudct.price}</span> {proudct.priceAfterDiscount?<span className=' text-[#9c34c2]'>{100-Math.ceil(proudct.priceAfterDiscount/proudct.price*100)}%</span> : ""}</p>
                </div>
                <div className=" flex items-center justify-center mt-4">
                    <IconCart id={proudct._id} />
                </div>
            </div>
            
        )}
        </div>
        
        </>}
    </>
)
}
