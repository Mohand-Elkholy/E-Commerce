import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function ProtectedRoute( {children} ) {
  const cookei = new Cookies()
  let user = cookei.get("token")
  
    if(!user){
        return <Navigate to={"/Login"} />
    }
  return (
    <>
    
    {children}
    </>
    
  )
}
