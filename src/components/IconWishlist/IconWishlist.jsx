import  { useContext} from 'react'
import styles from "./IconWishlist.module.css"
import { WishlistContext } from '../Context/WishlistContext'
import toast from 'react-hot-toast'
export default function IconWishlist({id}) {
    const {addToWishlist , deleteWishlistItem,  wishlistProducts  } = useContext(WishlistContext)


    async function handelWishlist(id){
        const resFlag = await addToWishlist(id)
        if(resFlag){
            toast.success("Add To Wishlist Successfully" , {
                duration:2000
            })
        }else{
            toast.error("Add To Wishlist Error", {
                duration:2000
            })
        }
    }
    async function handelDelete(id){
        await deleteWishlistItem(id)
    }

return (
    <>
    <div key={id} onClick={()=>{
                        
                        
                        if(wishlistProducts?.map((like)=>like._id  == id ).includes(true)){
                            handelDelete(id)

                        }else{
                            handelWishlist(id)
                        }
                    }}  className=" inline-flex justify-center items-center  absolute top-0 right-0 p-2 ">
                        <button className={`like-button ${wishlistProducts?.map((like)=>like._id  == id ).includes(true)?'liked' : ""  }`}>
                            <span className='like-icon'>
                                <div className='heart-animation-1'></div>
                                <div className='heart-animation-2'></div>
                            </span>
                        </button>
                        </div>
    </>
)
}
