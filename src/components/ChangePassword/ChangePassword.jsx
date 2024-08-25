import React, { useContext, useState } from 'react'
import styles from "./ChangePassword.module.css"
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
export default function ChangePassword() {
    const cookei = new Cookies()
    const [loading , setIsLoading] =useState(false)
    const {token , setToken} = useContext(authContext)
    const navigate = useNavigate()
    let headers = {
        token : token
    }
    let user = {
            currentPassword:"",
            password:"",
            rePassword:""
        }
    async function changePassword(values) {
        setIsLoading(true)
        const data = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword" , values ,{
            headers
        })
        .then(
            (data)=>{
                toast.success("Succes",{
                    duration:2000,
                })
                console.log(data);
                
                setIsLoading(false)
                
                
                navigate("/Login")
                localStorage.removeItem("token")
                localStorage.removeItem("email")
                localStorage.removeItem("name")
                setToken(null)
            }
        )
        .catch( 
            (data)=>{
            toast.error(`${data.response.data.errors.msg}`,{
                    duration:2000,
                })
                console.log(data);
                
            setIsLoading(false)
            }
            
        )
        
    }
    const changePasswordFormik = useFormik({
        initialValues: user,
        onSubmit: changePassword,
        validationSchema: yup.object().shape({
            currentPassword:yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ , `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`),
            password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ , `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`) ,
            rePassword: yup.string().required().oneOf([yup.ref("password")] , "Password doesn't match rePassword") ,
        })
    })
return (
    <>
    <Helmet>
                    <title>Change Password</title>
        </Helmet>
        <div className='w-1/2 mx-auto p-5 rounded-lg boxshadow2'>
        <h1 className='text-2xl text-[#9c34c2]'>Change Your Password</h1>
        <form className='mt-8' onSubmit={changePasswordFormik.handleSubmit}>
            
            <div className="w-full  pt-5">
                <Input  variant="underlined" type="password" label="Current Password" onBlur={changePasswordFormik.handleBlur}  isInvalid={changePasswordFormik.errors.currentPassword && changePasswordFormik.touched.currentPassword ? true : false} errorMessage={changePasswordFormik.errors.currentPassword}  color="secondary"    name="currentPassword" labelPlacement="outside" size='lg'  onChange={changePasswordFormik.handleChange} value={changePasswordFormik.values.currentPassword}/>
            </div>
            <div className="w-full  pt-5">
                <Input  variant="underlined" type="password" label="Password" onBlur={changePasswordFormik.handleBlur}  isInvalid={changePasswordFormik.errors.password && changePasswordFormik.touched.password ? true : false} errorMessage={changePasswordFormik.errors.password}  color="secondary"    name="password" labelPlacement="outside" size='lg'  onChange={changePasswordFormik.handleChange} value={changePasswordFormik.values.password}/>
            </div>
            <div className="w-full  pt-5">
                <Input type="password" label="Re-Password" onBlur={changePasswordFormik.handleBlur} isInvalid={changePasswordFormik.errors.rePassword && changePasswordFormik.touched.rePassword ? true : false} errorMessage={changePasswordFormik.errors.rePassword}  variant={"underlined"} color="secondary"  autocomplete="" name="rePassword"  labelPlacement="outside" size='lg' onChange={changePasswordFormik.handleChange} value={changePasswordFormik.values.rePassword}/>
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
