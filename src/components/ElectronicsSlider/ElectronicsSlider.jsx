import React, { useContext } from 'react'
import styles from "./ElectronicsSlider.module.css"
import axios from 'axios'
import Slider from 'react-slick'
import { MutatingDots, Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from "react-router-dom"
import IconWishlist from '../IconWishlist/IconWishlist'
import IconCart from '../IconCart/IconCart'
export default function ElectronicsSlider() {

    function getElectronics(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows:false,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:5,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow:3,
            slidesToScroll: 1,
          }
        },
        {
        breakpoint: 776,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
    };
    const {data ,isError,isLoading,error} = useQuery({
        queryKey:"Electronics",
        queryFn:getElectronics
    })
    if(isError){
        return <>
        <h2>{error}</h2>
        </>
    }
    const filteredData = data?.data.data.filter((proudct)=>proudct.category.name == "Electronics")
return (
    <>
    {!isLoading ? <>
    <h2 className=' font-semibold text-lg mt-10 mb-5 dark:text-slate-100'>Shop Popular Electronics :</h2>
    <Slider {...settings}>
        {filteredData.map((proudct)=> <div key={proudct._id} className="px-2">
          <div className='p-2 border rounded-lg'>
            <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <IconWishlist   id={proudct._id} data={data}/>
                    <p className=" absolute bottom-0 right-0 text-xs md:text-base lg:text-lg">{proudct.ratingsAverage} <i className='fa-solid fa-star text-[#9c34c2]'></i> ({proudct.ratingsQuantity}) </p>
                </div>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-[#9c34c2] mt-2 text-sm md:text-lg lg:text-xl'>{proudct.category.name}</h6>
                <p className='dark:text-slate-100 text-xs md:text-base lg:text-lg'>{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between'>
                    <p className='mt-2 dark:text-slate-100 text-xs md:text-base lg:text-lg'><span>EGP</span> <span>{proudct.priceAfterDiscount} </span> <span className={proudct.priceAfterDiscount?'line-through text-gray-300 dark:text-slate-400':''}>{proudct.price}</span> {proudct.priceAfterDiscount?<span className=' text-[#9c34c2]'>{100-Math.ceil(proudct.priceAfterDiscount/proudct.price*100)}%</span> : ""}</p>
                </div>
                <div className=" flex items-center justify-center mt-4">
                    <IconCart id={proudct._id} />
                </div>
          </div>
                
        </div>)}
        
    </Slider>
    </> :<div className='h-screen w-full flex justify-center items-center bg-white dark:bg-slate-800 absolute inset-0 z-20'>
        <Triangle
                visible={true}
                height="100"
                width="100"
                color="#9c34c2"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
    </div>}
    </>
)
}
