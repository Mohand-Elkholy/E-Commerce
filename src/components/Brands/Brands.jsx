
import styles from "./Brands.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom"
export default function Brands() {
    function getBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    const {data,isLoading,isError,error} = useQuery({
        queryKey:"allBrands",
        queryFn:getBrands
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
        <title>Brands</title>
    </Helmet>
    <div className='text-center'>
        <h2 className='text-[#9c34c2] text-3xl'>All Brands</h2>
    </div>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5' >
        {data.data.data.map(brand => <div key={brand._id} className=' text-center flex items-center justify-center flex-col boxshadow rounded-xl p-3'>
            <Link to={`/BrandsDetails/${brand.name}`}>
            <img src={brand.image} alt={brand.name} />
            <h3 className="dark:text-slate-100 mt-2">{brand.name}</h3>
            </Link>
        </div>)}
    </div>
    </>
)
}
