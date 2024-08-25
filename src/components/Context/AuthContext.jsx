import { createContext, useEffect, useState } from "react"
import Cookies from "universal-cookie"

export const authContext = createContext()
export default function AuthContext({children}) {
    const cookei = new Cookies()
    const [token , setToken] =useState(null)
    
    useEffect(() => {
        const userToken = cookei.get("token")
        if( userToken !== null){
            setToken(userToken)
        }
    }, [])
    
  return ( <authContext.Provider value={{token ,setToken }}>
        {children}
    </authContext.Provider>
  )
}
