import React,{useState} from 'react'
import Layout from './../components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/Auth'

const About = () => {
  const [auth]=useAuth();

  const [dat,setData]=useState({
    
  
    text:" ",
});
const {text}=dat;
const Change=e=>{
  setData({...dat,[e.target.name]:e.target.value})
}
const submitHand=async(e)=>{
    e.preventDefault();
  
    try{
      await axios.post('https://userinfo-8ac59-default-rtdb.firebaseio.com/feedback.json',dat);
      toast.success('feedback sent');
      setData(" ");
    }
    catch(error){
      toast.error(' please login to send feedback');
    }

 

}
  return (
    <Layout title={'About| E-cart'}>

        <div className='aboutUs' >
          <div className='col-md-4' style={{backgroundColor:'#b7b7a4'}}>
            <div className='name' id='animate'>
              <div className='animate__animated animate__slideInUp'>
              <h1 className='text-justify'><strong>Developer:</strong> Pavan Kalyan</h1>
                
              </div>
              {/* <h1 className='animate__animated animate__slideOutRight'><strong>Developer:</strong> Pavan Kalyan</h1> */}

            </div>
              
         
   <div>
    <form onSubmit={submitHand}>
      <h1>Feedback</h1>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleFormControlInput1"  value={auth?.user?.email} required rename='email' onChange={Change}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}  name='text' value={text}  minLength='5' maxlength="80" required onChange={Change}/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>

          </div>
      
          <div className='col-md-8' id='tech'>
            <h1 className='text-center p-2' style={{color:'#2A474C'}}>Technology Used</h1>
           <div className='' style={{color:'#145756'}}>
            <div className='col-md-5'>
              <h1 >JavaScript framework</h1>
              <p><Link to='https://legacy.reactjs.org/docs/getting-started.html' target='_blank'>React</Link></p>

            </div>
            <div className='col-md-5'>
              <h1>Programming laguage</h1>
              <p><Link to='https://nodejs.org/en' target='_blank'>Node.js</Link></p>

            </div>
            <div className='col-md-5'>
              <h1>Web framework</h1>
              <p><Link to='https://expressjs.com/' target='_blank'>Express</Link></p>

            </div>
            <div className='col-md-5'>
              <h1>Database</h1>
              <p><Link to='https://www.mongodb.com/' target='_blank'>MongoDB</Link></p>

            </div>
            <div className='col-md-5'>
              <h1>Analytics</h1>
              <p><Link to='https://analytics.google.com/analytics/'target='_blank'>Google Analytics(GA4)</Link></p>

            </div>
            <div className='col-md-5'>
              <h1>Email Notification</h1>
              <p><Link to='https://nodemailer.com/' target='_blank'>Node Mailer</Link></p>

            </div>

            <div className='col-md-5'>
              <h1>UI framework</h1>
              <p><Link to='https://getbootstrap.com/' target='_blank'>Bootstrap 4.5.3</Link></p>
              <p><Link to='https://ant.design/' target='_blank'>Ant Design</Link></p>

            </div>
            <div className='col-md-5'>
              <h1>Payment processors</h1>
              <p><Link to='https://getbootstrap.com/' target='_blank'>Braintree</Link></p>

            </div>

            </div>
            {/* <p className='text-justify mt-2'>
              
Payment processors
            </p> */}
    

         
          </div>
    
 

        </div>
      
    </Layout>
  )
}



export default About
