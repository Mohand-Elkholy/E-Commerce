import React, { useContext } from 'react'
import styles from "./Wishlist.module.css"
import { WishlistContext } from '../Context/WishlistContext'
import { Helmet } from 'react-helmet'
import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import IconWishlist from '../IconWishlist/IconWishlist'
import wishlist from "../../assets/shopping-cart2.png"

export default function Wishlist() {
    const {wishlistProducts , deleteWishlistItem , numOfItemOfWishlist} = useContext(WishlistContext)
    async function handelDelete(id){
        await deleteWishlistItem(id)
    }
return (
    <>
    <Helmet>
                    <title>Wishlist</title>
    </Helmet>
    {numOfItemOfWishlist == 0 ? <>
    <div className='  py-28'> 
        <div className='flex justify-center items-center'>
            <div className='text-center'>
                <p className='text-2xl font-bold mb-3'>Your Shopping Wishlist Looks Empty .</p>
                <p className='text-2xl font-semibold mb-5'>what are you waiting for ?</p>
                <Link to={"/Products"} className='btn p-2'>Check Our Products</Link>
            </div>
        
        <img src={wishlist} alt="wishlist" className='w-[200px]' />
        </div>
    </div>
    </>: <>
    <h2 className='text-center text-3xl mb-5 text-[#9c34c2]'>Wishlist</h2>
    <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2'>
        {wishlistProducts?.map((proudct)=>
            <div key={proudct._id} className='product p-2 group overflow-hidden border rounded-lg'>
                <Tooltip content={ ` In Stock : ${proudct.quantity}`} placement='top' offset={-7} showArrow={true} color='secondary'>
                <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <div onClick={()=>{
                            handelDelete(proudct._id)
                    }}  className=" inline-flex justify-center items-center  absolute top-0 right-0  ">
                        <button className={`like-button liked`}>
                            <span className='like-icon'>
                                <div className='heart-animation-1'></div>
                                <div className='heart-animation-2'></div>
                            </span>
                        </button>
                        </div>
                    <div onClick={()=>handelAddProduct(proudct._id)} className=" inline-flex justify-center items-center  absolute bottom-0 right-0 border rounded-lg p-2 bg-white"><i className="fa-solid fa-cart-plus text-[#9c34c2]"></i></div>
                    <p className=" absolute bottom-0 left-0">{proudct.ratingsAverage} <i className='fa-solid fa-star text-[#9c34c2]'></i> ({proudct.ratingsQuantity}) </p>
                </div>
                </Tooltip>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-[#9c34c2] mt-2'>{proudct.category.name}</h6>
                <p className='dark:text-slate-100'>{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between'>
                    <p className='mt-2 dark:text-slate-100'><span>EGP</span> <span>{proudct.priceAfterDiscount} </span> <span className={proudct.priceAfterDiscount?'line-through text-gray-300 dark:text-slate-400':''}>{proudct.price}</span> {proudct.priceAfterDiscount?<span className=' text-[#9c34c2]'>{100-Math.ceil(proudct.priceAfterDiscount/proudct.price*100)}%</span> : ""}</p>
                </div>
            </div>
            
        )}
    </div>
    </>}
    
    </>
)
}
