import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { authContext } from './AuthContext'
import { data } from 'autoprefixer'
export const WishlistContext = createContext()
export default function WishlistContextProvider({children}) {
    const {token} = useContext(authContext)
    let headers = {
        token : token
    }
    const [numOfItemOfWishlist, setNumOfItemOfWishlist] = useState(0)
    const [wishlistProducts, setWishlistProducts] = useState(null)
    const [wishlistItems, setWishlistItems] = useState(null)
    const [wishlistLikes, setWishlistLikes] = useState(null)

    async function addToWishlist(id) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
                "productId": id
        },{headers})
        .then((res)=>{
            getWishlistItems()
            return res
        })
        .catch((error)=>{
            console.log(error);
            
        })
        
    }


    async function getWishlistItems() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers})
        .then((res)=>{
            setNumOfItemOfWishlist(res.data.count)
            setWishlistProducts(res.data.data)  
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }


    async function deleteWishlistItem(id) {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
        .then((res)=>{
            getWishlistItems()
            toast.success("Delete Wishlist Item Successfully")
        })
        .catch((error)=>{
            console.log(error);
            toast.error("Delete Wishlist Item Error")
        })
        
    }



    useEffect(() => {
    if(token){
        getWishlistItems()
    }
    
  }, [token])
    return <WishlistContext.Provider value={{ wishlistLikes , setWishlistLikes , addToWishlist , numOfItemOfWishlist , wishlistProducts , wishlistItems , deleteWishlistItem}}>
        {children}
    </WishlistContext.Provider>
}
