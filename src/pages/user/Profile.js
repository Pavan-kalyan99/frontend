import React,{useState,useEffect} from 'react'
import Layout from './../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const [auth,setAuth]=useAuth();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
 
  const [phone,setPhone]=useState('');

//get user data
useEffect(()=>{
  const {email,name,phone,password}=auth?.user;
  setName(name);
  setPhone(phone);
  setEmail(email);
  setPassword(null);

},[auth?.user]);

//================updating profile=========
  const submitHand =async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.put('/api/auth/profile',
      {name,phone,email,password,});
      if(data?.error){
        toast.error(data?.error)
        
      }
      else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem('auth');
        ls=JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success('Profile updated successfully')
      }

    }
    catch(error){
      console.log(error);
      toast.error("something went wrong")
    }
  }
  return (
    <Layout title={'Your Profile'}>
         <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>


                </div>
                <div className='col-md-9'>
                <div className='form-cointainer'>
       
       <form onSubmit={submitHand}>
           <h1 className='title'>User Profile</h1>
     
       <div className="mb-3">
         <label htmlFor="exampleInputName" className="form-label">Name</label>   
         <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} 
         placeholder='Name ' id="exampleInputName"/>  
       </div>
     
       <div className="mb-3">
         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>    
         <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} required
         placeholder='Enter mail' id="exampleInputEmail1" aria-describedby="emailHelp"  disabled/>
       </div>
      
       <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}
    placeholder='Password' id="exampleInputPassword1" />
  </div>
   
       <div className="mb-3">
         <label htmlFor="exampleInputPhone" className="form-label">Phone</label>    
         <input type="text" className="form-control" value={phone} onChange={(e)=>{setPhone(e.target.value)}}
         placeholder='Enter Phone Number' id="exampleInputPhone"/>   
       </div>
      
       <button type="submit" className="btn btn-primary">Update</button>
     </form>
     
            </div>

               </div>

            </div>

        </div>


      
    </Layout>
  )
}

export default Profile
