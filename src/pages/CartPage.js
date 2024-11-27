import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast  from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";//payment

const CartPage = () => {
  const [auth,setAuth]=useAuth()
  const [cart,setCart]=useCart();
  const navigate=useNavigate();
  const [clientToken,setClientToken]=useState('');
  const [instance,setInstance]=useState('');
  const [loading,setLoading]=useState(false);
 //=============== total cart item price======================== 
 const totalPrice=()=>{
   try{
      let total=0;
      cart?.map(item=>{
        total=total+item.price;
      })
      return total.toLocaleString('en-US',{style:'currency',currency:"USD"})

    }
    catch(error){
      console.log(error);
    }
  }

//================remove cart item==============
  const removeCartItem=(pid)=>{
    try{
      let myCart=[...cart]
      let index=myCart.findIndex(item =>item._id === pid)
      myCart.splice(index,1)  //splice method
      setCart(myCart);
      localStorage.setItem('cart',JSON.stringify(myCart))
    }
    catch(error){
      console.log(error);

    }

  }
  //============get payment gateway token======================
  const getToken=async()=>{
    try{
   const {data}=await axios.get('/api/products/braintree/token');
   console.log('get payment gateway token:',data);
   setClientToken(data?.clientToken);

    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getToken()
  },[auth?.token]);
//==============handle payment================
const handlePayment=async()=>{
  try{
    setLoading(true);
  const {nonce}=await instance.requestPaymentMethod();
  const {data}=await axios.post('/api/products/braintree/payment',{
    nonce,cart,
  })
  console.log("braintree data:",data);
  setLoading(false);
  localStorage.removeItem('cart');
  setCart([]);
  navigate('/dashboard/user/orders');
  toast.success('Payment Completed Successfully');
  }
  catch(error){
    console.log(error);
    setLoading(false);
  }
}
//=====================
  return (
    <Layout title={'MyCart'}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2'>
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
           <h4>{cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? '':"Please login to checkout"}`:"Your cart is Empty"}</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {cart?.map(p=>(
              <div className='row mb-2 card flex-row' key={p._id}>
                <div className='col-md-4'>
                <img src={`/api/products/product-photo/${p._id}`} className="card-img-top" 
                    alt={p.name}   />
                </div>
                <div className='col-md-8'>
                  <h1>{p.name}</h1>
                  <p>{p.description.substring(0,30)}</p>
                 <h4>Price:${p.price}</h4>
                 <h4>Quantity:  {1}</h4>
                 <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}> Remove</button>
                </div>

              </div>
            ))}
          </div>
          <div className='col-md-4 text-center'>
            <h4>Cart summary</h4>
            <p>Total|Checkout|Payment</p>
            <hr/>
            <h4>Total:{totalPrice()}</h4>
            <div className='mt-2'>
              {
                !clientToken || !cart?.length ? (""):(
                  <>
                <DropIn options={{
              authorization:clientToken,
              paypal:{
                flow:'vault',
              },
            }} onInstance={(instance) =>setInstance(instance)}/>
            {/* <button className='btn btn-primary' onClick={handlePayment}
             disabled={!loading || !instance || !auth?.user}>{loading ? 'Processing...' : 'Make Payment'}</button> */}

             <button className='btn btn-primary' onClick={handlePayment}>Make a Payment</button>
                  </>
                )
              }
            
          </div>
          </div>
         

        </div>

      </div>
    </Layout>
  )
}

export default CartPage
