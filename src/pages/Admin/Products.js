import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Products = () => {

    const [product,setProducts]=useState([])

    //GET all products
    const getAllProducts=async()=>{
    try{
        const {data}=await axios.get('/api/products/get-product')
       // console.log("data is:",data);
        setProducts(data.product);

    }
    catch(error){
        console.log(error);
        toast.error('something went wrong')
    }
};
//lifecycle method
useEffect(()=>{
    getAllProducts();
},[]);

  return (
    <Layout>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>

            </div>
            <div className='col-md-9 '>
                <h1 className='text-center'>All Products</h1>
              <div className='d-flex flex-wrap'>

                
                {product?.map((p)=>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}   className='product-link'>
                           <div className="card m-2" style={{width: '18rem'}}>
                    <img src={`/api/products/product-photo/${p._id}`}
                     className="card-img-top" alt={p.name}
                    />
                     {/* style={{width:'40%',height:'auto'}} */}
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                    </div>
                    </div>
                    </Link>
                

                ))}
            </div>
                
            </div>

        </div>
      
    </Layout>
  )
}

export default Products;
