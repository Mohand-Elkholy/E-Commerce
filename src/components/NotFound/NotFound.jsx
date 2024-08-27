import React from 'react'
import styles from "./NotFound.module.css"
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
export default function NotFound() {
return (
    <>
    <Helmet>
        <title>Not Found</title>
    </Helmet>
    <div className='w-full flex items-center justify-center flex-col'>
        <h2 className='text-[150px] font-extrabold text-zinc-600 dark:text-slate-100'>404</h2>
        <p className='text-4xl font-semibold text-zinc-700 mb-7 dark:text-slate-100'>Page Not Found</p>
        <Link to={"/Home"} className='btn p-2 '>Go Home</Link>
    </div>
    </>
)
}
