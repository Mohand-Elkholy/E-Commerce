import React, { useContext, useState } from 'react'
import styles from "./UpdateProfile.module.css"
import { Input } from '@nextui-org/react'
import {useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { ColorRing} from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import Cookies from 'universal-cookie'
export default function UpdateProfile() {
    const {token , setToken} = useContext(authContext)
    const [loading , setIsLoading] =useState(false)
    const navigate = useNavigate()
    const cookei = new Cookies()
    let user = {
            name: "",
            email:"",
            phone:""
        }
        let headers = {
        token : token
    }
    async function updataProfile(values) {
        setIsLoading(true)
        const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/" , values , {headers})
        .then(
            (data)=>{
                toast.success("Succes" , {
                    duration:1000,
                })
                
                setIsLoading(false)
                cookei.remove("token")
                cookei.remove("email")
                cookei.remove("name")
                setToken(null)
                navigate("/Login")
            }
        )
        .catch( 
            (data)=>{
            toast.error(`${data.response.data.errors.msg} - ${data.response.data.errors.value}` , {
                    duration:3000,
                })
            
            setIsLoading(false)
            }
            
        )
        
    }
    const updataProfileFormik = useFormik({
        initialValues: user,
        onSubmit:updataProfile,
        validationSchema:yup.object().shape({
            name: yup.string().required("Name is required").min(3 , "Name must be more than 3 characters ").max(12 , "Name must be less than 12 characters ") ,
            email: yup.string().required("Email is required").email("Invalid Email"),
            phone: yup.string().required("Phone Number is required").matches(/^01[0125][0-9]{8}$/ , "Must be valid egyptian phone number"),
        })
    })
return (
    <>
    <Helmet>
                    <title>Update Profile</title>
        </Helmet>
        <div className='w-11/12 md:w-9/12 lg:w-7/12 mx-auto p-5 rounded-lg boxshadow2'>
        <h1 className='text-base md:text-xl text-[#9c34c2]'>Register Now :</h1>
        <form className='mt-3' onSubmit={updataProfileFormik.handleSubmit}>
            <div className="w-full  pt-3">
                <Input onBlur={updataProfileFormik.handleBlur} isInvalid={updataProfileFormik.errors.name && updataProfileFormik.touched.name ? true : false} errorMessage={updataProfileFormik.errors.name} type="text" label="Name"   variant={"underlined"} color="secondary" name="name" autocomplete=""  labelPlacement="outside" size='lg'  onChange={updataProfileFormik.handleChange} value={updataProfileFormik.values.name}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="email" label="Email" onBlur={updataProfileFormik.handleBlur}  isInvalid={updataProfileFormik.errors.email && updataProfileFormik.touched.email ? true : false} errorMessage={updataProfileFormik.errors.email}  variant={"underlined"} color="secondary"  autocomplete="" name="email"   labelPlacement="outside"  size='lg'  onChange={updataProfileFormik.handleChange} value={updataProfileFormik.values.email}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="text" label="Phone Number" onBlur={updataProfileFormik.handleBlur} isInvalid={updataProfileFormik.errors.phone && updataProfileFormik.touched.phone ? true : false} errorMessage={updataProfileFormik.errors.phone}  variant={"underlined"} color="secondary"  autocomplete="" name="phone"  labelPlacement="outside" size='lg'  onChange={updataProfileFormik.handleChange} value={updataProfileFormik.values.phone}/>
            </div>
            <button type='submit' className='btn p-3 mt-3 ml-auto block text-center'>{loading ? <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : "Submit" }</button>
        </form>
        </div>
    </>
)
}
