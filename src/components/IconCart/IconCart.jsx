import React, { useContext, useState } from 'react'
import styles from "./IconCart.module.css"
import { cartContext } from '../Context/CartContext'
export default function IconCart({id}) {
    const {addProduct , products ,  updateCount , deleteCartItem} = useContext(cartContext)

    async function handelAddProduct(id){
        await addProduct(id)
    }
    async function handelDelete(id){
        await deleteCartItem(id)
    }
return (
    <>
    <div   className=" min-w-36    cursor-pointer  border rounded-lg p-2 bg-white dark:bg-slate-600 dark:text-slate-100">
        {products?.map((added)=>added.product._id == id ).includes(true)?<>
        <div className="flex items-center">
            
                        {products.filter((item)=>item.product._id == id)[0].count == 1 ? <div onClick={()=>{
                            handelDelete(id)
                            }} className=' cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'><i className="fa-solid fa-trash-can text-[#9c34c2] text-xs"></i></div>  
                            :
                        <button onClick={()=>{
                            updateCount(products.filter((item)=>item.product._id == id)[0].product._id ,products.filter((item)=>item.product._id == id)[0].count -1 )
                        }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                        </button>}
                        
                        <div>
                        <input key={id} onChange={(e)=>updateCount( products?.map((product)=>product.product._id) , e.target.value)} type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={products.filter((item)=>item.product._id == id)[0].count }  required />
                        </div>
                        <button onClick={()=>updateCount(products.filter((item)=>item.product._id == id)[0].product._id , products.filter((item)=>item.product._id == id)[0].count + 1 )} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                        </button>
                    </div>
        
        </>:<>
        <div onClick={()=>{
            handelAddProduct(id)
    }}>
        <i  className="fa-solid fa-cart-plus text-[#9c34c2] mr-3"></i>
        <span>Add To Cart</span>
        </div>
        
        </>}
        
    </div>
    </>
)
}
