import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const[cart,setCart] =useCart();
    const params=useParams();

    const [product,setProduct]=useState({});
    const [releatedProduct,setReleatedProduct]=useState([])
    //initial details
    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])

    //=============get products========================================
    const getProduct=async()=>{
        try{
             const {data}=await axios.get(`/api/products/get-product/${params.slug}`)
             console.log("single:",data)
             setProduct(data?.product);
             getSimilar(data?.product._id,data?.product.category._id)
        }
        catch(error){
            console.log(error);
        }}

//=============get similar products===========================
const getSimilar=async(pid,cid)=>{
    try{
        const {data}=await axios.get(`/api/products/related-product/${pid}/${cid}`)
        console.log("similar",data)
        setReleatedProduct(data?.product)

    }
    catch(error){

        console.log(error)
    }
}
  return (
    <Layout title={'Product details'}>
        {/* <p>Product details</p>
        {JSON.stringify(product,null,4)} */}
      <div className='row container' style={{marginTop:'69px'}}>
        <div className='col-md-6'>
        <img src={`/api/products/product-photo/${product._id}`}
                     className="card-img-top" alt={product.name}
                     height='350' width={'300px'}
                    />

        </div>
        <div className='col-md-6'>
           <h2 className='text-center'>Product details</h2>
           <h6>Name:{product.name}</h6>
           <h6>description:{product.description}</h6>
           <h6>Price:{product.price}</h6>

           <h6>category:{product?.category?.name}</h6>
           <button type="button" className="btn btn-success" 

            onClick={()=>{setCart([...cart,product]);
            localStorage.setItem('cart',JSON.stringify([...cart,product]))
               toast.success('Item added to cart');
             }}>ADD TO CART</button>





        </div>
        <hr></hr>
        <div className='row container'>
        <h1>Similar products</h1>
        {releatedProduct.length < 1 && (<p className='text-center'>No  Similar Products found</p>)}
        <div className='d-flex flex-wrap'>
                 
            {releatedProduct?.map((p)=>(
      
                    <div className="card m-2" style={{width: '18rem'}}  >
                    <img src={`/api/products/product-photo/${p._id}`} className="card-img-top" 
                    alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}</p>
                        <p className="card-text">${p.price}</p>
                    
                            <div className="btn-group ms-1" role="group" aria-label="Basic mixed styles example">
                          
                         
                              <button type="button" className="btn btn-success">ADD TO CART</button>
                            </div>


                    </div>
                    </div>
                 
                

                ))}
            </div>


        </div>


      </div>
    </Layout>
  )
}

export default ProductDetails
