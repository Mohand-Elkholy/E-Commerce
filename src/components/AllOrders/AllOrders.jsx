import React, { useContext, useEffect, useState } from 'react'
import styles from "./AllOrders.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Cookies from "universal-cookie"

export default function AllOrders() {
    const [data, setData] = useState(null)
    const cookei = new Cookies()
    const cartOwner = cookei.get("cartOwner")
    async function allOrders() {
    await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
    .then((res)=>{
        console.log(res.data);
        setData(res.data)
    })
    .catch((error)=>{
        console.log(error);
        
    })
}
    useEffect(() => {
        allOrders()
        console.log(cartOwner);
        
    },[])
return (
    <>
    <h2 className=' text-center text-3xl mt-5 text-[#9c34c2] font-bold'>All Orders</h2>
    {data?.map((order , index)=><div key={order.id} className='mt-16 border p-4 relative'>
        <div className=' absolute top-[-30px] left-0 text-2xl text-[#9c34c2] font-bold'>#{index + 1}</div>
    <div className='flex items-center justify-between'>
        <p className='bg-[#9c34c2] text-white  text-xs  md:text-lg p-1 md:p-2 rounded-lg'><span className='font-bold'>Payment Method :</span>  {order.paymentMethodType}</p>
    <p className='bg-[#9c34c2] text-white  text-xs md:text-lg p-1 md:p-2 rounded-lg'><span className='font-bold'>Total Order Price :</span> {order.totalOrderPrice}</p>
    </div>
    <div className='flex flex-wrap items-start justify-between my-4'>
        <div className='w-5/12'>
            <h3 className='text-sm md:text-lg font-semibold text-[#9c34c2] mb-2 '>User Details</h3>
            <p className='dark:text-slate-100 text-xs md:text-base mt-1 md:mt-2'> <span className='text-[#9c34c2] font-bold'>User Name :</span> {order.user.name}</p>
            <p className='dark:text-slate-100 text-xs md:text-base mt-1 md:mt-2'> <span className='text-[#9c34c2] font-bold'>User Email:</span> {order.user.email}</p>
            <p className='dark:text-slate-100 text-xs md:text-base mt-1 md:mt-2' > <span className='text-[#9c34c2] font-bold'>User Phone :</span> {order.user.phone}</p>
        </div>
        <div className='w-5/12'>
            <h3 className='text-sm md:text-lg font-semibold text-[#9c34c2] mb-2'>Shipping Address </h3>
            <p className='dark:text-slate-100 text-xs md:text-base mt-1 md:mt-2'> <span className='text-[#9c34c2] font-bold'>City :</span> {order.shippingAddress.city}</p>
            <p className='dark:text-slate-100 text-xs md:text-base mt-1 md:mt-2'> <span className='text-[#9c34c2] font-bold'>Details :</span> {order.shippingAddress.details}</p>
            <p className='dark:text-slate-100 text-xs md:text-base mt-1 md:mt-2'> <span className='text-[#9c34c2] font-bold'>Phone :</span> {order.shippingAddress.phone}</p>
        </div>
    </div>
    
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 '>
        {order.cartItems.map((item)=><div key={item._id} className=' border p-3  '>
            
            <div className=' relative'>
                    <img src={item.product.imageCover} alt={item.product.title} className='w-full ' />
                    <p className=" absolute bottom-0 right-0 text-xs md:text-base">{item.product.ratingsAverage} <i className='fa-solid fa-star text-[#9c34c2]'></i> ({item.product.ratingsQuantity}) </p>
            </div>
            <Link to={`/ProductDetails/${item.product._id}`}>
                <h6 className='text-[#9c34c2] mt-2 text-base md:text-lg '>{item.product.category.name}</h6>
                <p className='dark:text-slate-100 text-xs  md:text-base'>{item.product.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between mt-3'>
            <p className='dark:text-slate-100 text-[10px]  md:text-xs' ><span className='text-[#9c34c2] text-sm font-bold'>Count :</span> {item.count}</p>
            <p className='dark:text-slate-100 text-[10px]  md:text-xs'> <span className='text-[#9c34c2] text-sm font-bold'>Price :</span> {item.price}</p>
            </div>
        </div>)}
    </div>
    </div>)}
    </>
)
}
