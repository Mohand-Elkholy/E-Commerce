import React, { useState } from 'react'
import styles from "./ResetPassword.module.css"
import { Input } from '@nextui-org/react'
import {useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { ColorRing} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
export default function ResetPassword() {
const [loading , setIsLoading] =useState(false)
    const navigate = useNavigate()
    let user = {
            email:"",
            newPassword:""
        }
    async function resetPassword(values) {
        setIsLoading(true)
        await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , values)
            .then(
                (data)=>{
                console.log(data);
                toast.success(`Password Changed`,{
                    duration:2000,
                })
                setIsLoading(false)
                navigate("/Login")
            }
        )
        .catch( 
            (data)=>{
                console.log(data);
            setIsLoading(false)
            }
            
        )
        
    }
    const resetPasswordFormik = useFormik({
        initialValues: user,
        onSubmit: resetPassword,
        validationSchema: yup.object().shape({
            email: yup.string().required("Email is required").email("Invalid Email"),
            newPassword: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ , `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`) ,
        })
    })
return (
    <>
    <Helmet>
        <title>Reset Password</title>
    </Helmet>
    <div className='w-1/2 mx-auto p-5 rounded-lg boxshadow2'>
        <h1 className='text-2xl text-[#9c34c2]'>Please Enter Your Email & New Password</h1>
        <form className='mt-8' onSubmit={resetPasswordFormik.handleSubmit}>
            <div className="w-full  pt-5">
                <Input variant="underlined"  type="email" label="Email" onBlur={resetPasswordFormik.handleBlur}  isInvalid={resetPasswordFormik.errors.email && resetPasswordFormik.touched.email ? true : false} errorMessage={resetPasswordFormik.errors.email}   color="secondary"   name="email"   labelPlacement="outside"  size='lg'  onChange={resetPasswordFormik.handleChange} value={resetPasswordFormik.values.email}/>
            </div>
            <div className="w-full  pt-5">
                <Input  variant="underlined" type="password" label="New Password" onBlur={resetPasswordFormik.handleBlur}  isInvalid={resetPasswordFormik.errors.password && resetPasswordFormik.touched.password ? true : false} errorMessage={resetPasswordFormik.errors.password}  color="secondary"    name="newPassword" labelPlacement="outside" size='lg'  onChange={resetPasswordFormik.handleChange} value={resetPasswordFormik.values.password}/>
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
