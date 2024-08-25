import React, { useState } from 'react'
import styles from "./ForgetPassword.module.css"
import { ColorRing } from 'react-loader-spinner'
import { Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import * as yup from "yup"
import axios from 'axios'
import { Helmet } from 'react-helmet'
export default function ForgetPassword() {
    const [loading , setIsLoading] =useState(false)
    const navigate = useNavigate()
    let user = {
            email:""
        }
    async function forgetPassword(values) {
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , values)
        .then(
            (data)=>{
                console.log(data);
                toast.success(`${data?.data?.message}`,{
                    duration:2000,
                })
                setIsLoading(false)
                navigate("/VerfiyResetCode")
            }
        )
        .catch( 
            (data)=>{
                console.log(data);
                
            toast.error(`${data?.response.data.message}`,{
                    duration:2000,
                })
            setIsLoading(false)
            }
            
        )
        
    }
    const forgetPasswordFormik = useFormik({
        initialValues: user,
        onSubmit: forgetPassword,
        validationSchema: yup.object().shape({
            email: yup.string().required("Email is required").email("Invalid Email"),
        })
    })
return (
    <>
    <Helmet>
        <title>Forget Password</title>
    </Helmet>
    <div className='w-1/2 mx-auto p-5 rounded-lg boxshadow2'>
        <h1 className='text-2xl text-[#9c34c2]'>Please Enter Your Email</h1>
        <form className='mt-8' onSubmit={forgetPasswordFormik.handleSubmit}>
            <div className="w-full  pt-5">
                <Input variant="underlined"  type="email" label="Email" onBlur={forgetPasswordFormik.handleBlur}  isInvalid={forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email ? true : false} errorMessage={forgetPasswordFormik.errors.email}   color="secondary"   name="email"   labelPlacement="outside"  size='lg'  onChange={forgetPasswordFormik.handleChange} value={forgetPasswordFormik.values.email}/>
            </div>
            <div className='flex items-center justify-between mt-3'>
                <button type='submit' className='btn p-3 block text-center ml-auto'>{loading ? <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : "Submit" }</button>
            </div>
            
        </form>
        </div>
    </>
)
}
