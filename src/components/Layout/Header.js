import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { HiMiniGift } from "react-icons/hi2";

import { useAuth } from '../../context/Auth';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/Cart';
import {Badge} from 'antd'
import {ShoppingCartOutlined } from '@ant-design/icons'
const Header = () => {
  const [auth,setAuth]=useAuth();
  const [cart] =useCart();
  const categories =useCategory();
  const HandleLogout=()=>{
    setAuth({
      ...auth,user:null,token:''
    })
    localStorage.removeItem('auth')
  }

  return (

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link  to='/' className="navbar-brand">
  <HiMiniGift/> E-STORE</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-1 " >
      <li><SearchInput/></li>

            <li className="nav-item ">
              <NavLink  to='/' className="nav-link "  aria-current="page" >Home</NavLink>
           </li>

                   <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" to={'/categories'}  data-bs-toggle="dropdown">
           Categories
         </a>
         <ul className='dropdown-menu'>

         <li className="dropdown-item">
           <NavLink  to='/categories'
            >All Categories</NavLink>
         </li>

        
         {categories.map(c=>(

           <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
  
         ))}
         </ul>
       </li>


       {  !auth.user ? (<>
              
         {/* <li className="nav-item" >
           <NavLink  to='/register'
            className="nav-link" >Register</NavLink>
         </li> */}

         <li className="nav-item">
           <NavLink  to='/login'
            className="nav-link" >Login</NavLink>
         </li>
       </>) :(<>
        <li className="nav-item dropdown">
   <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
   </NavLink>

     <ul className="dropdown-menu">
        <li><NavLink  to ={`/dashboard/${auth?.user?.role === 1 ? 'admin' :'user'}`} className="dropdown-item" >Dashboard</NavLink></li>
         <li><NavLink  to='/login' className="dropdown-item" onClick={HandleLogout} >Logout</NavLink></li>
   </ul>
     </li></>)}  

         <li className="nav-item ">
         <NavLink  to='/cart' className="nav-link " >
         <Badge count={cart?.length} showZero offset={[10, -5]}>
         C<ShoppingCartOutlined/>RT 
         
        </Badge>
    </NavLink>  
     
        </li>
   </ul>    
</div>
  </div>
</nav>


  )
}

export default Header
