import React, {  useState } from 'react'
import styles from "./Register.module.css"
import { Input } from '@nextui-org/react'
import {  useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { ColorRing} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
export default function Register() {
    const [loading , setIsLoading] =useState(false)
    const navigate = useNavigate()
    let user = {
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        }
    async function regiterUser(values) {
        setIsLoading(true)
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
        .then(
            (data)=>{
                toast.success("Succes" , {
                    duration:1000,
                })
                setIsLoading(false)
                setTimeout(()=>{
                    navigate("/Login")
                } , 2000)
            }
        )
        .catch( 
            (data)=>{
            toast.error(`${data.response.data.message}` , {
                    duration:2000,
                })
            setIsLoading(false)
            }
            
        )
        
    }
    const registerFormik = useFormik({
        initialValues: user,
        onSubmit:regiterUser,
        validationSchema:yup.object().shape({
            name: yup.string().required("Name is required").min(3 , "Name must be more than 3 characters ").max(12 , "Name must be less than 12 characters ") ,
            email: yup.string().required("Email is required").email("Invalid Email"),
            password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ , `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`) ,
            rePassword: yup.string().required().oneOf([yup.ref("password")] , "Password doesn't match rePassword") ,
            phone: yup.string().required("Phone Number is required").matches(/^01[0125][0-9]{8}$/ , "Must be valid egyptian phone number"),
        })
    })
    
return (
    <>
        <Helmet>
                    <title>Register</title>
        </Helmet>
        <div className='w-1/2 mx-auto  p-5 rounded-lg boxshadow2'>
        <h1 className='text-2xl text-[#9c34c2]'>Register Now :</h1>
        <form className='mt-8' onSubmit={registerFormik.handleSubmit}>
            <div className="w-full  pt-3">
                <Input onBlur={registerFormik.handleBlur} isInvalid={registerFormik.errors.name && registerFormik.touched.name ? true : false} errorMessage={registerFormik.errors.name} type="text" label="Name"   variant={"underlined"} color="secondary" name="name" autocomplete=""  labelPlacement="outside" size='lg'  onChange={registerFormik.handleChange} value={registerFormik.values.name}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="email" label="Email" onBlur={registerFormik.handleBlur}  isInvalid={registerFormik.errors.email && registerFormik.touched.email ? true : false} errorMessage={registerFormik.errors.email}  variant={"underlined"} color="secondary"  autocomplete="" name="email"   labelPlacement="outside"  size='lg'  onChange={registerFormik.handleChange} value={registerFormik.values.email}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="password" label="Password" onBlur={registerFormik.handleBlur}  isInvalid={registerFormik.errors.password && registerFormik.touched.password ? true : false} errorMessage={registerFormik.errors.password} variant={"underlined"} color="secondary"   autocomplete="" name="password" labelPlacement="outside" size='lg'  onChange={registerFormik.handleChange} value={registerFormik.values.password}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="password" label="Re-Password" onBlur={registerFormik.handleBlur} isInvalid={registerFormik.errors.rePassword && registerFormik.touched.rePassword ? true : false} errorMessage={registerFormik.errors.rePassword}  variant={"underlined"} color="secondary"  autocomplete="" name="rePassword"  labelPlacement="outside" size='lg' onChange={registerFormik.handleChange} value={registerFormik.values.rePassword}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="text" label="Phone Number" onBlur={registerFormik.handleBlur} isInvalid={registerFormik.errors.phone && registerFormik.touched.phone ? true : false} errorMessage={registerFormik.errors.phone}  variant={"underlined"} color="secondary"  autocomplete="" name="phone"  labelPlacement="outside" size='lg'  onChange={registerFormik.handleChange} value={registerFormik.values.phone}/>
            </div>
            <button type='submit' className='btn p-3 mt-3 ml-auto block text-center'>{loading ? <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : "Regsiter" }</button>
        </form>
        </div>
    </>
)
}
