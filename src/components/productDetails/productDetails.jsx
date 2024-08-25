import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { Tooltip } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';
import IconCart from '../IconCart/IconCart';

export default function ProductDetails() {
    const {id} = useParams()
    const {addProduct} = useContext(cartContext)
    const [position, setPosition] = useState({x:0 , y:0})
    const [cursorPosition, setCursorPosition] = useState({x:0 , y:0})
    const [show, setShow] = useState(false)
    const [Img, setImg] = useState(null)
    async function handelAddProduct(id){
        const resFlag = await addProduct(id)
        if(resFlag){
            toast.success("Add Product Successfully" , {
                duration:2000
            })
        }else{
            
        }
    }
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const {data,isLoading,isError,error} =  useQuery({
        queryKey:["ProductDetails" , id],
        queryFn:getProductDetails
    })
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <h2>{error}</h2>
    }
    const Details = data.data.data
    const img = Details.imageCover
    const imgs = Details.images
    const handelMouseHover = (e)=>{
        const { top , left , width , height} = e.currentTarget.getBoundingClientRect()
        const x = ((e.pageX - left) / width) * 100
        const y = ((e.pageY- top) / height) * 100
        setPosition({x , y})
        setCursorPosition({x:e.pageX - left , y:e.pageY - top})
    }
    function handelImg(photo){
        setImg(photo)
        console.log(Img);
        
    }
return (
    <>
    <Helmet>
        <title>Product Details</title>
    </Helmet>
    <div className='flex flex-wrap items-center justify-between p-8  '>
        <div className='w-full md:w-1/2 lg:w-1/3 flex items-center justify-center flex-col gap-y-1'>
            <div className='img-zoom ' onMouseEnter={()=>{setShow(true)}} onMouseLeave={()=>setShow(false)} onTouchMove={handelMouseHover} onMouseMove={handelMouseHover}>
                <img src={Img?Img:Details.imageCover} alt={Details.title}  className='w-auto' />
                {show && <div style={{
                    position:"absolute",
                    left:`${cursorPosition.x - 100}px `,
                    top:`${cursorPosition.y - 100}px`,
                    pointerEvents:"none",
                    zIndex:"1000",
                    width:"200px",
                    height:"200px"
                }}>
                    <div className='zoom' style={{
                        backgroundImage:`url(${Img?Img:img})`,
                        backgroundPosition:`${position.x}%  ${position.y}%`,
                        backfaceVisibility:"visible",
                        
                    }}></div>
                </div>}
            </div>
            <div className='flex flex-wrap  items-center justify-center   gap-y-1'>
                {imgs.map((photo , index)=><div key={index} className={`w-1/${imgs.length >4?4:imgs.length}`}>
                    <div className='p-2'>
                        <img src={photo} alt={`image${index}`} onClick={()=>handelImg(photo)} />
                    </div>
                    
                </div>)}
                
            </div>
            
        </div>
        <div className='w-full md:w-1/2 lg:w-2/3 mt-5'>
            <div className='px-8 '>  
                <div className='flex items-center justify-between'>
                <h2 className='text-[#9c34c2]  text-sm lg:text-xl font-bold'>{Details.title} </h2>
                {Details.priceAfterDiscount?<div className='   px-1 py-2 lg:p-2  bg-[#9c34c2b3] text-white '>-{100-Math.ceil(Details.priceAfterDiscount/Details.price*100)}%</div> : ""}
                </div>
                
                <p className='mt-5 dark:text-slate-100 text-sm lg:text-lg'><span className='text-[#9c34c2] font-bold'>Category :</span> {Details.category.name}</p>
                <p className='mt-2 dark:text-slate-100 text-sm lg:text-lg'><span className='text-[#9c34c2] font-bold'>Brand :</span> {Details.brand.name}</p>
                <p className='mt-2 dark:text-slate-100 text-sm lg:text-lg'>{Details.description}</p>
                <div className='flex items-center justify-between mt-2'>
                    <p className='dark:text-slate-100 text-sm lg:text-lg'><span className='text-[#9c34c2] font-bold'>Price :</span> <span className={Details.priceAfterDiscount?'line-through text-gray-100 dark:text-slate-400':''}>{Details.price}</span> <span>{Details.priceAfterDiscount} </span>  EGP</p>
                    <Tooltip showArrow={true} content={`ratingsQuantity: ${Details.ratingsQuantity}`} color='secondary'>
                        <p className='dark:text-slate-100 text-sm lg:text-lg'><span><i className='fa-solid fa-star text-purple-600'></i></span>{Details.ratingsAverage}</p>
                    </Tooltip>
                </div>
                <div className='flex items-center justify-center mt-3'>
                    <IconCart id={Details._id} />
                </div>
            </div>
            
        </div>
    </div>
    </>
)
}
