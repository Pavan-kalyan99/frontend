import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CategoryProduct = () => {
    const navigate=useNavigate();
   const params=useParams();
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState([]);


    useEffect(()=>{
      if(params?.slug)  categoryProduct();
    },[params?.slug])
    const categoryProduct=async()=>{
        try{
            const {data}=await axios.get(`/api/products/product-category/${params.slug}`)
            setProduct(data?.product)
            setCategory(data?.category)

        }
        catch(error){
            console.log((error));

        }
    }
  return (
    <Layout>
      <div className='container mt-3' >
        <h1 className='text-center'>Category:{category?.name}</h1>
        <h4 className='text-center'>{product.length} result found</h4>
   
        <div className="row row-cols-1 row-cols-md-3 g-4">                 
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
                             {/* <button  class="btn btn-primary ms-1">Smore details</button>
                             <button  class="btn btn-primary ms-1">ADD TO CART</button> */}
                                 <center> 
                                 <div className="card-footer">
                               
                                   <button type="button" className="btn btn-warning" 
                                   onClick={()=>navigate(`/product/${p.slug}`)}>Details</button>&nbsp;&nbsp;
                                   <button type="button" className="btn btn-success">ADD TO CART</button>
                                 </div>
                                 </center>
  
     
     
                        
                         </div>
                      
                     </div>
     
                     ))}
                 </div>
 

      </div>
    </Layout>
  )
}

export default CategoryProduct
