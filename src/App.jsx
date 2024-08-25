

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import AuthContext from './components/Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './components/productDetails/productDetails'
import CartContextProvider from './components/Context/CartContext'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider from './components/Context/WishlistContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerfiyResetCode from './components/VerfiyResetCode/VerfiyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ChangePassword from './components/ChangePassword/ChangePassword'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import AllOrders from './components/AllOrders/AllOrders'
import Payment from './components/Payment/Payment'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import BrandsDetails from './components/BrandsDetails/BrandsDetails'


function App() {
  let routers = createBrowserRouter([{
    path:"" , element:<Layout/> , children:[
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"Home" , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"Products" , element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"ProductDetails/:id" , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"Login" , element:<Login/>},
      {path:"Register" , element:<Register/>},
      {path:"ForgetPassword" , element:<ForgetPassword/>},
      {path:"VerfiyResetCode" , element:<VerfiyResetCode/>},
      {path:"ResetPassword" , element:<ResetPassword/>},
      {path:"ChangePassword" , element:<ProtectedRoute><ChangePassword /></ProtectedRoute>},
      {path:"UpdateProfile" , element:<ProtectedRoute><UpdateProfile /></ProtectedRoute>},
      {path:"Categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"CategoryDetails/:name" , element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
      {path:"Cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"Wishlist" , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:"allorders" , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:"Payment" , element:<ProtectedRoute><Payment/></ProtectedRoute>},
      {path:"Brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"BrandsDetails/:name" , element:<ProtectedRoute><BrandsDetails/></ProtectedRoute>},
      {path:"*" , element:<NotFound/>},
    ]
  }])
  const myConfig = new QueryClient()
  return (
    <>
    <AuthContext>
      <QueryClientProvider client={myConfig}>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={routers}></RouterProvider>
                
            </WishlistContextProvider>
          </CartContextProvider>
      </QueryClientProvider>
    </AuthContext>
    </>
  )
}

export default App
