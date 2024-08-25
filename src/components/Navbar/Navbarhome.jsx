import React, { useContext, useEffect, useState } from 'react'
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, DropdownItem, Dropdown, DropdownTrigger, Button, DropdownMenu, Avatar} from "@nextui-org/react";

import styles from "./Navbar.module.css"
import Logo from "../../assets/icons8-fast-cart-96.png"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import  { authContext } from '../Context/AuthContext';
import { cartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import user from "../../assets/user.png"
import Cookies from 'universal-cookie';
export default function Navbarhome() {
    const cookei = new Cookies()
    const navigate = useNavigate()
    const {numberOfCartItems} = useContext(cartContext)
    const {token , setToken} = useContext(authContext)
    const {numOfItemOfWishlist} = useContext(WishlistContext)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [theme, setTheme] = useState("light")
    const menuItems = [
    "Home",
    "Products",
    "Categories",
    "Brands",
];
token ? menuItems[5] = "Logout" :menuItems[5] = "Login"

function handelLogout(){
    cookei.remove("token")
    cookei.remove("name")
    cookei.remove("email")
    setToken(null)
    navigate("/Login")
}
useEffect(() => {
    if(theme === "dark"){
        document.querySelector('body').classList.add('dark');
    }else{
        document.querySelector('body').classList.remove('dark');
    }
}, [theme])
const  handelDarkMood = ()=>{
setTheme(theme === "dark" ? "light" : "dark")
console.log(theme);

}

return (
    <>
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            maxWidth='full'
            >
            <NavbarContent className="md:hidden " justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}  className='text-[#9c34c2]  font-black'/>
            </NavbarContent>

            <NavbarContent className="md:hidden " justify="center">
                <NavbarBrand>
                <Link to={"/Home"} className='flex items-center justify-center  '>
                <img src={Logo} alt=""  className='w-[50px]'/>
                <p className="title text-[#9c34c2] text-xl font-extrabold">MooShopping</p>
                </Link>
                </NavbarBrand>
            </NavbarContent>

                <NavbarBrand className='hidden md:flex '  justify="start">
                <Link to={"/Home"} className='flex items-center justify-center  '>
                <img src={Logo} alt=""  className='w-[50px]'/>
                <p className="title text-[#9c34c2] text-xl font-extrabold">MooShopping</p>
                </Link>
                </NavbarBrand>
                {token ? <NavbarContent className="hidden md:flex gap-4 ml-6" justify="center">
                <NavbarItem>
                <NavLink  to="/Home" className='text-black dark:text-slate-100 dark:hover:text-[#9c34c2] text-lg  hover:text-[#9c34c2] transition-all duration-400'>
                    Home
                </NavLink>
                </NavbarItem>
                <NavbarItem >
                <NavLink to="/Products" className='text-black dark:text-slate-100 dark:hover:text-[#9c34c2] text-lg  hover:text-[#9c34c2] transition-all duration-400'>
                    Products
                </NavLink>
                </NavbarItem>
                <NavbarItem>
                <NavLink  to="/Categories" className='text-black dark:text-slate-100 dark:hover:text-[#9c34c2] text-lg hover:text-[#9c34c2] transition-all duration-400'>
                    Categories
                </NavLink>
                </NavbarItem>
                <NavbarItem>
                <NavLink  to="/Brands" className='text-black dark:text-slate-100 dark:hover:text-[#9c34c2] text-lg hover:text-[#9c34c2] transition-all duration-400'>
                    Brands
                </NavLink>
                </NavbarItem>
            </NavbarContent> : null}
            

            <NavbarContent justify="end" className='ml-8'>
                {token ? 
                <>
                    <NavbarItem>
                        <Link  to="/Wishlist" className='text-black dark:text-slate-100 dark:hover:text-[#9c34c2] text-lg hover:text-[#9c34c2] transition-all duration-400'>
                            <div className=' relative'>
                            <i className="fa-solid fa-heart text-[#9c34c2]"></i>
                            {numOfItemOfWishlist==0?"":<span className=' absolute top-[-10px] right-[-10px] text-xs w-2 h-2 rounded-full bg-[#9c34c2] text-white flex items-center justify-center p-2'>{numOfItemOfWishlist}</span>}
                            </div>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link  to="/Cart" className='text-black dark:text-slate-100 dark:hover:text-[#9c34c2]   text-lg hover:text-[#9c34c2] transition-all duration-400'>
                            <div className=' relative'>
                            <i className="fa-solid fa-cart-shopping text-[#9c34c2]"></i>
                            {numberOfCartItems==0?"":<span className=' absolute top-[-10px] right-[-10px] text-xs w-2 h-2 rounded-full bg-[#9c34c2] text-white flex items-center justify-center p-2'>{numberOfCartItems}</span>}
                            </div>
                        </Link>
                    </NavbarItem>
                    <Dropdown backdrop="blur">
                        <DropdownTrigger>
                            <img
                                
                                as="button"
                                className="transition-transform w-10"
                                src={user}
                            />
                            
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="name" textValue='name' className='dark:text-slate-100'>{cookei.get("name")}</DropdownItem>
                            <DropdownItem key="email" textValue='email' className='dark:text-slate-100'>{cookei.get("email")}</DropdownItem>
                            <DropdownItem key="Updata" textValue='profile' className='dark:text-slate-100'><Link to={"/UpdateProfile"}>Updata Your Profile</Link></DropdownItem>
                            <DropdownItem key="Change" textValue='password' className='dark:text-slate-100'><Link to={"/ChangePassword"}>Change Password</Link></DropdownItem>
                            <DropdownItem key="Logout" textValue='log'><span  className=' text-lg text-[#9c34c2] cursor-pointer' onClick={handelLogout}>Logout</span></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </>
                : <>
                <NavbarItem >
                <NavLink to="" className=' text-lg text-[#9c34c2]'>Login</NavLink>
                </NavbarItem>
                <NavbarItem>
                <NavLink   to="Register"  className='text-[#9c34c2] text-lg '>
                    Register
                </NavLink>
                </NavbarItem>
                </>}
                <NavbarItem>
                    <label className="relative inline-flex items-center cursor-pointer" >
                        <input onClick={handelDarkMood} className="sr-only peer" defaultValue type="checkbox" />
                        <div  className="w-16 h-8 rounded-full ring-0 peer duration-500 outline-none bg-white overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-6 before:w-6 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-6 after:h-6 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0" />
                    </label>

                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                    <NavLink
                    className={`${index === 5 ? "text-[#9c34c2]" : index === menuItems.length - 1 ? "text-[#9c34c2]" : "text-black dark:text-slate-100"} dark:hover:text-[#9c34c2] hover:text-[#9c34c2] transition-all duration-400`
                    }
                    to={`/${item !== "Logout" ? item :"Login"}`}
                    onClick={item !== "Logout" ? "" : handelLogout}
                    size="lg"
                    >
                    { item }
                    </NavLink>
                </NavbarMenuItem>
                
                ))}
            </NavbarMenu>
        </Navbar>
    </>
)
}
