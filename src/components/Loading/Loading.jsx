import React from 'react'
import styles from "./Loading.module.css"
import { MutatingDots, Triangle } from 'react-loader-spinner'
export default function Loading() {
return (
    <>
    <div className='h-screen flex justify-center items-center bg-white dark:bg-slate-800'>
            <Triangle
                visible={true}
                height="100"
                width="100"
                color="#9c34c2"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
    </div>
    </>
)
}
