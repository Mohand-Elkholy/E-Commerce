import React, {  useContext,  useState } from 'react'
import styles from "./Login.module.css"
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

export default function Login() {
    const { token , setToken} =  useContext(authContext)
    const cookei = new Cookies()
    const [loading , setIsLoading] =useState(false)
    const navigate = useNavigate()
    let user = {
            email:"",
            password:""
        }
    async function loginUser(values) {
        setIsLoading(true)
        const data = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
        .then(
            (data)=>{
                setToken(data?.data.token)
                cookei.set("token" , data?.data.token , {
                    secure:true , 
                    path:"/"
                })
                cookei.set("email" ,data?.data?.user.email , {
                    secure:true , 
                    path:"/"
                } )
                cookei.set("name" ,data?.data?.user.name, {
                    secure:true , 
                    path:"/"
                } )
                setIsLoading(false)
                
                
                navigate("/Home")
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
    const loginFormik = useFormik({
        initialValues: user,
        onSubmit: loginUser,
        validationSchema: yup.object().shape({
            email: yup.string().required("Email is required").email("Invalid Email"),
            password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ , `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`) ,
        })
    })
return (
    <>
        <Helmet>
                    <title>Login</title>
        </Helmet>
        <div className='w-1/2 mx-auto  p-5 rounded-lg boxshadow2'>
        <h1 className='text-2xl text-[#9c34c2]'>Login Now :</h1>
        <form className='mt-8' onSubmit={loginFormik.handleSubmit}>
            <div className="w-full  pt-5">
                <Input variant="underlined"  type="email" label="Email" onBlur={loginFormik.handleBlur}  isInvalid={loginFormik.errors.email && loginFormik.touched.email ? true : false} errorMessage={loginFormik.errors.email}   color="secondary"    name="email"   labelPlacement="outside"  size='lg'  onChange={loginFormik.handleChange} value={loginFormik.values.email}/>
            </div>
            <div className="w-full  pt-5">
                <Input  variant="underlined" type="password" label="Password" onBlur={loginFormik.handleBlur}  isInvalid={loginFormik.errors.password && loginFormik.touched.password ? true : false} errorMessage={loginFormik.errors.password}  color="secondary"     name="password" labelPlacement="outside" size='lg'  onChange={loginFormik.handleChange} value={loginFormik.values.password}/>
            </div>
            <div className='flex items-center justify-between mt-3'>
                <Link to={"/ForgetPassword"} className=' cursor-pointer hover:text-[#9c34c2] dark:text-slate-100 dark:hover:text-[#9c34c2]'>Forget Password ?</Link>
                <button type='submit' className='btn p-3 block text-center'>{loading ? <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : "Login" }</button>
            </div>
            
        </form>
        </div>
        
    </>
)
}
