import React, { useContext, useEffect } from 'react'
import styles from "./Cart.module.css"
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import cart from "../../assets/shopping-cart.png"
export default function Cart() {
    const {products ,  totalCartPrice , updateCount , deleteCartItem , clearCart , numberOfCartItems} = useContext(cartContext)
    async function handelDeleteItem(id){
        const resFlage = await deleteCartItem(id)
        
        
        if(resFlage){
            toast.error("Can't delete product")
        }else{
            toast.success("Delete Product Successfully")
        }
    }
return (
    <>
    <Helmet>
                    <title>Cart</title>
    </Helmet>
    {numberOfCartItems==0?<>
    <div className='  py-28'> 
        <div className='flex justify-center items-center'>
            <div className='text-center'>
                <p className='text-2xl font-bold mb-3'>Your Shopping Cart Looks Empty .</p>
                <p className='text-2xl font-semibold mb-5'>what are you waiting for ?</p>
                <Link to={"/Products"} className='btn p-2'>Check Our Products</Link>
            </div>
        
        <img src={cart} alt="cart" className='w-[200px]' />
        </div>
    </div>
    </>:<>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className='text-[#9c34c2] text-lg'>
                <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                Product
                </th>
                <th scope="col" className="px-6 py-3">
                Qty
                </th>
                <th scope="col" className="px-6 py-3">
                Price
                </th>
                <th scope="col" className="px-6 py-3">
                Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
            </thead>
            <tbody>
                {products?.map((product)=><tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                    <img src={product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product?.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-slate-100">
                    {product?.product.title}
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center">
                        {product.count === 1 ? <div onClick={()=>handelDeleteItem(product.product._id)} className=' cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'><i className="fa-solid fa-trash-can text-[#9c34c2] text-xs"></i></div>   :
                        <button onClick={()=>updateCount(product.product._id , product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                        </button>}
                        
                        <div>
                        <input onChange={(e)=>updateCount(product.product._id , e.target.value)} type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product?.count} required />
                        </div>
                        <button onClick={()=>updateCount(product.product._id , product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                        </button>
                    </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-slate-100">
                    {product?.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-slate-100">
                    {product?.price * product?.count}
                    </td>
                    <td className="px-6 py-4">
                    <button onClick={()=>handelDeleteItem(product.product._id)} className="font-medium text-[#9c34c2]  hover:underline">Remove</button>
                    </td>
                </tr> )}
                
            </tbody>
        </table>
        <div className=' mt-5 mb-3 mr-3'><button onClick={()=>clearCart()} className='btn p-2 ml-auto block'>Clear Cart</button></div>
        </div>
        <div className='w-1/3 mt-14 relative pb-20'>
            <h2 className='text-3xl font-bold text-[#9c34c2] mb-4 '>Cart Total</h2>
            <div className='flex items-center justify-between text-lg mb-2 pb-2 border-b-2 dark:text-slate-100'><span>SubTotal</span><span>{totalCartPrice} EGP</span></div>
            <div className='flex items-center justify-between text-lg mb-2 pb-2 border-b-2 dark:text-slate-100'><span>Shipping Fee</span><span>Free</span></div>
            <div className='flex items-center justify-between text-lg pb-2 font-bold dark:text-slate-100'><span>Total</span><span></span>{totalCartPrice} EGP</div>
            <div className='ml-auto block mt-5 absolute  right-0 bottom-4'>
                <Dropdown >
                <DropdownTrigger>
                    <Button 
                    variant="bordered" 
                    color='secondary'
                    className=' uppercase'
                    >
                    Checkout
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="Cash" textValue="Cash" className='dark:text-slate-100'><Link to={"/Payment"} state={{method:"Cash On Delivery"}}>Cash Payment</Link></DropdownItem>
                    <DropdownItem key="Online" textValue='Online' className='dark:text-slate-100'><Link to={"/Payment"} state={{method:"Online Payment"}}>Online Payment</Link></DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
        </div>
    </>}
    </>
)
}
