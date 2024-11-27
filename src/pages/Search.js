import React, { useState } from 'react'
import Layout from './../components/Layout/Layout';
import { useSearch } from '../context/search';
import SearchLoad from './SearchLoad';
import { useCart } from '../context/Cart';
import toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues]=useSearch();
    const[cart,setCart] =useCart();
    const navigate=useNavigate();

  return (
    <Layout title={'search results'}>
        <div className='container' >
            <div className='text-center'>
                <h2>Search Results</h2>
                <h5>
                    {values?.result.length < 1 ? <h2>'No product Found' </h2>:`Found ${values?.result.length}`}
                </h5>
                <div className='text-center'>All products</div>
       {(values?.result?.length >1) ?  <div className="row row-cols-1 row-cols-md-3 g-4">

                 
            {values?.result.map((p)=>(
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
                    <small>                    
                        <button type="button" className="btn btn-warning"  onClick={()=>navigate(`/product/${p.slug}`)}>Details</button>&nbsp;&nbsp;  
                        <button type="button" className="btn btn-success"  onClick={()=>{setCart([...cart,p]);
                                localStorage.setItem('cart',JSON.stringify([...cart,p]))
                                  toast.success('Item added to cart');
                                  }}>ADD TO CART</button>
                    </small>    
                    </div>
                    </div>
                </div>
                 
                

                ))}

            </div>: <SearchLoad/>}


            </div>
            
        </div>

      
    </Layout>
  )
}

export default Search
