import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/Auth'
import moment from 'moment';

const Orders = () => {
 const [orders,setOrders]=useState([]);
 const [auth,setAuth]=useAuth();

const GetOrders=async()=>{
  try{
    const {data}=await axios.get('/api/auth/orders');
    setOrders(data)
  }
  catch(error){
    console.log(error);

  }

  useEffect(()=>{
    if(auth?.token) GetOrders()
  },[auth?.token])
}
  return (
    <Layout title={'Your Orders'}>
        
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>


                </div>
                <div className='col-md-9'>
                  <h1>All orders</h1>
                  {/* <p>{JSON.stringify(orders,null,4)}</p> */}
                  {
                    orders?.map((o,i)=>{
                      return(
                        <div className='border shadow'>
                           <table className='table'>
                              <thead>
                                  <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Buyer</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Payment</th>
                                    <th scope='col'>Quantity</th>


                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                     <td>{i+1}</td>
                                     <td>{o?.status}</td>
                                     <td>{o?.buyer?.name}</td>
                                     <td>{moment(o?.createAt).fromNow()}</td>
                                     <td>{o?.payment.success ? "Success":"failed"}</td>
                                     <td>{o?.product?.lenth}</td>
                                  </tr>
                              </tbody>
                              
                           </table>
                           <div className='container'>
                           <div className='col-md-8'>
            {o?.product.map((p,i)=>(
              <div className='row mb-2 card flex-row'>
                <div className='col-md-4'>
                <img src={`/api/products/product-photo/${p._id}`} className="card-img-top" 
                    alt={p.name}  width={'60px'} height={'120px'} />
                </div>
                <div className='col-md-8'>
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0,30)}</p>
                 <h4>Price:${p.price}</h4>
                </div>

              </div>
            ))}
          </div>
                            

                           </div>
                        </div>
                      )
                    })
                  }

               </div>

            </div>

        </div>


      
    </Layout>

  )
}

export default Orders
