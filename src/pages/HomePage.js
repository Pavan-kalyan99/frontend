import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout';

import axios from 'axios';
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';
import Load from '../pages/Load'

import Banner from './pics/banner.png'
const HomePage = () => {
 const navigate=useNavigate();
  
 const[cart,setCart] =useCart();

  const [product,setProducts]=useState([]);
  const [categories,setCategories] =useState([]);
  const [checked,setChecked]=useState([]);

  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0);
  const[page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
 // const[timer,setTimer]=useState('')


  //======================get all category ================================================================================
    const getAllCategory=async()=>{
      try{
        const {data}=await axios.get('/api/category/get-category/');
        console.log("categories list",data)
        if(data?.success){
          setCategories(data?.category);
        }   }
      catch(error){
        console.log(error);
      }
    }
    useEffect(()=>{
      getAllCategory();
      getTotal();
    },[]);

// ============   get all products========================================================================================
        const getAllProducts=async()=>{
          try{
            setLoading(true);
            const {data}=await axios.get(`/api/products/product-list/${page}`);
            console.log("Homepage getallproducts data is:",data);
            setLoading(false)
            setProducts(data.product);
          }
          catch(error){
            setLoading(false)
            console.log(error);
          }
        }
     
  //====================getTotal count============
  const getTotal =async()=>{
    try{
      const {data}= await axios.get('/api/products/product-count')
      setTotal(data?.total);    
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
   if(page === 1) return;
    loadMore();
  },[page]);
 //=====================Loadmore============================
   const loadMore =async()=>{
    try{
      setLoading(true)
      const {data} =await axios.get(`/api/products/product-list/${page}`)
      setLoading(false);
      setProducts([...product, ...data?.product]);
    }
    catch(error){
     
      console.log(error);
      setLoading(false);
    }
   }     

//=============Filter by category=========================================================================================
const handleFilter=(value,id)=>{
let all=[...checked];
console.log("all:",...all)
if(value){
  all.push(id);
}
else{
  all=all.filter((c)=>c !== id);
}
setChecked(all);
};
  // life cycle method
  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts();
   },[checked.length,radio.length]);

useEffect(()=>{
if(checked.length || radio.length) filterProduct();

},[checked,radio]);

//=================================get filter products===================================================================================
const filterProduct=async()=>{
  try{
    const {data}= await axios.post('/api/products/product-filters',{checked,
      radio,});
    setProducts(data?.product);
  }
  catch(error){
    console.log(error);
  }
};

if(product.length === 0){
  return <Load/>
}

  return (
    <Layout title={'All Products'}>

        <img src={Banner} alt='banner' style={{width:'100%'}} className='container-'/>
      {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
      <div className='container-fluid row' >
        <div className='col-md-2' style={{backgroundColor:'#CEDCD4'}}>
          <div className='text-center'>Filter by category </div>
  
          <div className='d-flex flex-column' style={{backgroundColor:'#7DA78F'}}>
      
          {categories?.map((c)=>(
        
             <Checkbox key={c._id}  onChange={(e)=>handleFilter(e.target.checked,c._id)}>
              {c.name}</Checkbox>
          ))

          }
          </div>
      
 {/* /=====================================price filter================================== */}
             <div className='text-center mt-4'>Filter by price </div>
                  <div className='d-flex flex-column' style={{backgroundColor:'#7DA78F'}}>                  
               <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                {Prices?.map((p)=>(
                  <div key={p._id}>

                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
               </Radio.Group>        
               </div>

               <div className='d-flex flex-column'>                  
               <button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTER</button>     
               </div>


        </div>
        <div className='col-md-9'>
            {/* {JSON.stringify(checked,null,4)} */}
            <div className='text-center'><h1>All Products</h1></div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* {!product? <Load/> :'loading'} */}
           {/* <p>timer:{timer}</p>  */}
            {product?.map((p)=>(
                  <div className='col'>
                    <div className=" border-secondary card h-100" >
                  
                    <img src={`/api/products/product-photo/${p._id}`} className="card-img-top" 
                    alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}</p>
                        <p className="card-text">${p.price}</p>
                    </div>
                            <div className="card-footer">
                              <center>
                            <small className="text-body-secondary center">
                            <button type="button" className="btn btn-warning" 
                              onClick={()=>navigate(`/product/${p.slug}`)}>Details</button>
                            

                            </small>&nbsp;&nbsp;
                            <small className="text-body-secondary center">
                                    {/* //Add to cart */}
                              <button type="button" className="btn btn-success ms-1"
                           
                         //  onClick={()=>addCartItem(p)}
                             onClick={()=>{setCart([...cart,p]);
                                // if(true){

                                //   cart.filter((e, i,cart) => cart.indexOf(e)!==i);
                                //   return localStorage.setItem('cart',JSON.stringify([...cart,p]))
                                // }
                            
                               localStorage.setItem('cart',JSON.stringify([...cart,p]));


                        
                                  toast.success('Item added to cart');
                          
                               }}
                                >ADD TO CART</button>
                            </small>
                            </center>
                          
                            </div>


                    </div>
                    </div>
                    
                 
                

                ))}
            </div>

            <div className='m-2 p-3'>
              {product && product.length <total && (
                <button className='btn btn-warning' 
                onClick={(e)=>{
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "loading...":"Loadmore"}

                </button>
              )}
            </div>
        </div>

      </div>
    </Layout>
  )
}

export default HomePage;

