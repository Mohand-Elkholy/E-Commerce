import styles from "./Categories.module.css"
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom"
export default function Categories() {
    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    const {data,isLoading,isError,error} = useQuery({
        queryKey:"allCategories",
        queryFn:getCategories
    })
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <>
        <h2>{error}</h2>
        </>
    }
return (
    <>
        <Helmet>
            <title>Categories</title>
        </Helmet>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5' >
        {data.data.data.map(category => <div key={category._id} className=' border overflow-hidden text-center flex items-center justify-center flex-col boxshadow rounded-xl'>
            <Link to={`/CategoryDetails/${category.name}`}>
            <img src={category.image} alt={category.name}  className='w-full h-[200px] md:h-[300px]'/>
            <h3 className='text-[#9c34c2] py-4 font-bold text-lg md:text-xl'>{category.name}</h3>
            </Link>
        </div>)}
    </div>
    </>
)
}
