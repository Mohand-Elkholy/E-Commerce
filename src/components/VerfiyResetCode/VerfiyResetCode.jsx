import React, { useState } from 'react'
import styles from "./VerfiyResetCode.module.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { Input } from '@nextui-org/react'
import { ColorRing } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
export default function VerfiyResetCode() {
const [loading , setIsLoading] =useState(false)
    const navigate = useNavigate()
    let user = {
            resetCode:""
        }
    async function VerfiyCode(values) {
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , values)
        .then(
            (data)=>{
                toast.success(`${data?.data?.status}`,{
                    duration:2000,
                })
                setIsLoading(false)
                navigate("/ResetPassword")
            }
        )
        .catch( 
            (data)=>{
                
            toast.error(`${data?.response.data.message}`,{
                    duration:2000,
                })
            setIsLoading(false)
            }
            
        )
        
    }
    const VerfiyCodeFormik = useFormik({
        initialValues: user,
        onSubmit: VerfiyCode,
    })
return (
    <>
    <Helmet>
        <title>Forget Password</title>
    </Helmet>
    <div className='w-11/12 md:w-9/12 lg:w-7/12 mx-auto p-5 rounded-lg boxshadow2'>
        <h1 className='text-base md:text-xl text-[#9c34c2]'>Please Enter Your Verification Code</h1>
        <form className='mt-3' onSubmit={VerfiyCodeFormik.handleSubmit} >
            <div className="w-full ">
                <Input variant="underlined"  type="text" label="ResetCode"    color="secondary"   name="resetCode"   labelPlacement="outside"  size='lg' onChange={VerfiyCodeFormik.handleChange}  value={VerfiyCodeFormik.values.resetCode}/>
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