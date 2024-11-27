import React from 'react'
import Layout from './../components/Layout/Layout';

const row={

    border: '2px solid black',
   padding:'1%',
  marginLeft:'2%',
  marginRight:'2%',
  textIndent:'10px',
  wordSpacing: 'auto',

  textAlign:'justify',
  overflow:'hidden'
 
  
  
}
const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
        <h1 className='text-center'> Privacy Policy </h1>
        <div className='row policy'>
          {/* <div className='col-md-6'>
          <h1>Read Privacy policy</h1>
          </div>
          <div className='col-md-4'>
            <p>one</p>
            <p>one</p>
            <p>one</p>
            <p>one</p>
            <p>one</p>
            <p>one</p>
            <p>one</p><p>one</p>
            
            

          </div> */}

<div className="container text-center">
  <div className='row align-items-start' style={row}>
    <div className="col-md-12">
      <p>We collect the personal information you give us such as your name, address, phone number
         and email addresswhen you enter a request, sign up to our information sheet or register your 
         interest as a potential volunteer. This personal information is not distributed, shared, rented, 
         or given to companies or organizations that are not part of the National Foundation for India (NFI)
        </p><br/>
 
<p> We will make sure your personal information is held safely, as per the Data Protection Act.
  
 The General Information is not Personal Information.NFI's tracking system does not record personal
  information about individuals or link this information tonany Personal Information collected from you.
  
 The General Information is used by NFI for statistical analysis,for tracking overall traffic patterns 
 on the Site and to gauge the public interest in NFI and the Site.Such General Information may be shared
  by NFI with any person, at NFI's discretion.</p><br/>
  <h1>Links</h1>
  <p>When you click on links on our website, they may direct you away from our site. We are not responsible for 
 the privacy practices of other sites and encourage you to read their privacy statements.</p>
  <h1>COOKIES</h1>
  <p>
 We use cookies to maintain session of your browsing. It is not used to personally identify you on other websites.</p>
    </div>
   
  </div>
</div>

        </div>
      
    </Layout>
  )
}

export default Policy
