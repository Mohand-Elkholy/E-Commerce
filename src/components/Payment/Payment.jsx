import React, {  useContext,  useState } from 'react'
import styles from "./Payment.module.css"
import { Input } from '@nextui-org/react'
import {useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { ColorRing} from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { cartContext } from '../Context/CartContext'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Payment() {
    const [loading , setIsLoading] =useState(false)
    const{onlinePayment , cashPayment} = useContext(cartContext)
    const {state} = useLocation()
    const navigate = useNavigate()
    let user = {
        details: "",
        phone: "",
        city: ""
        }

    async function checkOut(values) {
        setIsLoading(true)
        if(state.method == "Online Payment"){
            await onlinePayment(values)
        }else {
            await cashPayment(values)
            navigate("/allorders")
        }
        
        setIsLoading(false)
    }
    const checkOutFormik = useFormik({
        initialValues: user,
        onSubmit: checkOut,
        validationSchema: yup.object().shape({
            details: yup.string().required().min(10 , "Details must be more than 10 characters "),
            phone: yup.string().required("Phone Number is required").matches(/^01[0125][0-9]{8}$/ , "Must be valid egyptian phone number"),
            city: yup.string().required().min(6 , "Your Address must be more than 6 characters ")
        })
    })
return (
    <>
    <Helmet>
                    <title>Payment</title>
        </Helmet>
        <div className='w-11/12 md:w-9/12 lg:w-7/12 mx-auto  p-5 rounded-lg boxshadow2'>
        <h1 className='text-base md:text-xl text-[#9c34c2]'>{state.method}</h1>
        <form className='pt-5' onSubmit={checkOutFormik.handleSubmit}>
            <div className="w-full ">
                <Input variant="underlined"  type="text" label="Details" onBlur={checkOutFormik.handleBlur}  isInvalid={checkOutFormik.errors.details && checkOutFormik.touched.details ? true : false} errorMessage={checkOutFormik.errors.details}   color="secondary"   name="details"   labelPlacement="outside"  size='lg'  onChange={checkOutFormik.handleChange} value={checkOutFormik.values.details}/>
            </div>
            <div className="w-full  pt-5">
                <Input variant="underlined"  type="tel" label="Phone" onBlur={checkOutFormik.handleBlur}  isInvalid={checkOutFormik.errors.phone && checkOutFormik.touched.phone ? true : false} errorMessage={checkOutFormik.errors.phone}   color="secondary"   name="phone"   labelPlacement="outside"  size='lg'  onChange={checkOutFormik.handleChange} value={checkOutFormik.values.phone}/>
            </div>
            <div className="w-full  pt-5">
                <Input variant="underlined"  type="text" label="Your Address" onBlur={checkOutFormik.handleBlur}  isInvalid={checkOutFormik.errors.city && checkOutFormik.touched.city ? true : false} errorMessage={checkOutFormik.errors.city}   color="secondary"   name="city"   labelPlacement="outside"  size='lg'  onChange={checkOutFormik.handleChange} value={checkOutFormik.values.city}/>
            </div>
            <div className='flex items-center justify-between mt-5'>
                <button type='submit' className='btn p-3 block text-center ml-auto'>{loading ? <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : "Pay Now" }</button>
            </div>
            
        </form>
        </div>
    </>
)
}
