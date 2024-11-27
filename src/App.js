
import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgetPassword from './pages/Auth/ForgetPassword';

import PageNotfound from './pages/PageNotfound';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

import ReactGa from 'react-ga4';
const TRACKING='G-NK9RTDJDNT';
ReactGa.initialize(TRACKING)
ReactGa.send({
  hitType:'pageView',
  page:'',
  title: "Home page"

})

function App() {
//   useEffect(()=>{
//   //ReactGa.pageview(window.location.pathname);
//   //console.log(window.location.pathname);
//     //ReactGa.pageview('/')
//   },[]);

  return (
   <>
   <Routes>
    <Route  path='/' element={<HomePage/>}/>
    <Route  path='/search' element={<Search/>}/>
    <Route  path='/product/:slug' element={<ProductDetails/>}/>
    <Route  path='/categories' element={<Categories/>}/>
    <Route  path='/category/:slug' element={<CategoryProduct/>}/>

    <Route  path='/cart' element={<CartPage/>}/>

    <Route  path='/dashboard' element={<PrivateRoute/>}>
    <Route  path='user' element={<Dashboard/>}/>
    <Route  path='user/orders' element={<Orders/>}/>
    <Route  path='user/profile' element={<Profile/>}/>
    </Route>
    
    <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/products' element={<Products/>}/>
      <Route path='admin/product/:slug' element={<UpdateProduct/>}/>


       <Route path='admin/users' element={<Users/>}/>
       <Route path='admin/orders' element={<AdminOrders/>}/>


    </Route>

 
    <Route  path='/register' element={<Register/>}/>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/forget-password' element={<ForgetPassword/>}/>
    <Route  path='/about' element={<About/>}/>
      <Route  path='/policy' element={<Policy/>}/>
      <Route  path='*' element={<PageNotfound/>}/>
   </Routes>

 

   </>
  );
}

export default App;
