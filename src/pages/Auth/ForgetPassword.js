// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';
import Layout from './../../components/Layout/Layout';
 import axios from 'axios'
import toast from 'react-hot-toast';

// const ForgetPassword = () => {

//     const [email,setEmail]=useState('');
//     const [newPassword,setnewPasaword]=useState('');
//     const [answer,setAnswer]=useState('');
//   //  const [auth,setAuth]=useAuth()
//   const navigate=useNavigate()
//   //const location=useLocation()

//     const submitHand =async(e)=>{
//         e.preventDefault()
//         try{
//           const res =await axios.post('/api/auth/forget-password',
//           {email,newPassword,answer});
//           if(res && res.data.success){
//              toast.success(res.data && res.data.message)
//             //  toast.success("successfully registered");

//            navigate('/login');
//           }
//           else{
//             toast.error(res.data.message)
//           }
    
//         }
//         catch(error){
//           console.log(error);
//           toast.error("something went wrong")
//         }
//       }
//   return (
//     <Layout title={'Forget Password -Ecommerce App'}>
       
//     <div className='form-cointainer'>
   
//    <form onSubmit={submitHand}>
//        <h1 className='title'>Reset Password</h1>

 
//    <div className="mb-3">
//      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>    
//      <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} required
//      placeholder='Enter mail' id="exampleInputEmail1" aria-describedby="emailHelp" />
//    </div>

    
//    <div className="mb-3">
//      <label htmlFor="exampleInputPassword1" className="form-label">Enter your answer</label>
//      <input type="text" className="form-control" value={answer} onChange={(e)=>{setAnswer(e.target.value)}} required
//      placeholder='what is your best friend name' id="exampleInputPassword1" />
//    </div>

//    <div className="mb-3">
//          <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
//          <input type="password" className="form-control" value={newPassword} onChange={(e)=>{setnewPasaword(e.target.value)}} required
//          placeholder='Password' id="exampleInputPassword1" />
//        </div>

  
//    <button type="submit" className="btn btn-primary">Reset</button>
//  </form>
 
//         </div>
  
// </Layout>
//   )
// }

// export default ForgetPassword
import { Component } from 'react'
import React from 'react'
//import 'bootstrap'
export default class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
        };
        this.submitHand= this.submitHand.bind(this);
    }
   

     
      submitHand=async(e)=>{
        e.preventDefault();
        const {email}=this.state;
        try{
          await axios({
            method:'POST',
            url:'/api/auth/forget-password',
            data:{email}
          })
          toast.success("Please check your mail");
        }
        catch(error){
         
          toast.error("Your email not found")

        }
       
   
       
         
    }
render(){
  return (
    <Layout title={'Forget Password|E-store'}>
    <div className='form-cointainer card item-center'>
    <h2>Forget Password</h2>
    
         <form onSubmit={this.submitHand} style={{width: '75%',border:'2px solid black',borderRadius:'10px'}} className='p-2'>
         <div className="form-group mb-3">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
    onChange={(e)=>this.setState({email:e.target.value})}  name='email' value={this.email}  required />
         
       </div>

  <input type="submit" name='submit' className="btn btn-primary" />


         </form>
 </div>

  
</Layout> 
    
  )
}
}


