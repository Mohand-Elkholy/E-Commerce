
import styles from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from 'react-slick'
import { MutatingDots, Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from "react-router-dom"
export default function CategoriesSlider() {
    function getCatgories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows:false,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:7,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow:5,
            slidesToScroll: 2,
          }
        },
        {
        breakpoint: 776,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
    };
    const {data ,isError,isLoading,error} = useQuery({
        queryKey:"allCategories",
        queryFn:getCatgories
    })
    if(isError){
        return <>
        <h2>{error}</h2>
        </>
    }
return (
    <>
    {!isLoading ? <>
    <h2 className='my-5 font-semibold text-lg dark:text-slate-100'>Shop Popular Categories :</h2>
    <Slider {...settings}>
        {data.data.data.map((category)=> <div key={category._id} className="text-center px-1">
          <Link to={`/CategoryDetails/${category.name}`}>
          <img src={category.image} alt={category.name}  className='w-full h-44 rounded-full'/>
            <h6 className="dark:text-slate-100">{category.name}</h6>
          </Link>
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
