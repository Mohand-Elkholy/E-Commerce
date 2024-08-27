import React from 'react'
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbarhome from '../Navbar/Navbarhome'
import { Offline} from 'react-detect-offline'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
return (
    <>
    
        <Navbarhome />
    <div className=" container mx-auto px-5 py-5 min-h-[80vh] dark:bg-slate-800">
        <div className='pt-10 dark:bg-slate-800'>
        <Outlet />

        </div>
    </div>
    <Footer />
    <Toaster />
    <div className='fixed bottom-3 right-2 bg-white  rounded-lg'>

    <Offline><i className="fa-solid fa-wifi line-through text-[#9c34c2]"></i> </Offline>
    </div>
    </>
)
}
