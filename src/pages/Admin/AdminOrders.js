import React,{useState,useEffect} from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../context/Auth'
import moment from 'moment';
import { Select } from 'antd';
const {Option}=Select;


const AdminOrders = () => {

const [status,setStatus]=useState(['Not process','processing','Shipped','delivered','Cancel']);
const [changeStatus,setChangeStatus]=useState('');
  const [orders,setOrders]=useState([]);
  const [auth,setAuth]=useAuth();
 
 const GetOrders=async()=>{
   try{
     const {data}=await axios.get('/api/auth/all-orders');
     setOrders(data);
   }
   catch(error){
     console.log(error);
 
   }
  };
 
   useEffect(()=>{
     if(auth?.token) GetOrders();
   },[auth?.token]);

const handleChange=async(orderId,value)=>{
  try{
 const {data}=await axios.put(`/api/auth/order-status/${orderId}`,
 {status:value,});
 GetOrders();
  }
  catch(error){
    console.log(error);
  }

}



  return (
    <Layout title={'All ordered data'}>
      <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
              
        </div>
        <div className='col-md-9'>
            <h1 className=''>All orders</h1>
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
                                     <td><Select bordered={false}  onChange={(value)=>handleChange(o._id,value)} 
                                     defaultValue={o?.status}>
                                      {status.map((s,i)=>(
                                        <Option key={i} value={s}>{s}</Option>
                                      ))

                                      }
                                      </Select></td>
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
    </Layout>
  )
}

export default AdminOrders
