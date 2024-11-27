import React from 'react'
import Layout from '../components/Layout/Layout';

import Banner from './pics/banner.png'

const Load = () => {



  return (
    <Layout>

      <div className='row'>
      <img src={Banner} alt='banner' className='container'/>

      <div className='col-md-2'>
         
      {/* <p className="card-text placeholder-glow">
      <span className="placeholder col-6" />
      <span className="placeholder col-5" />
      <span className="placeholder col-4" />
      <span className="placeholder col-3" />
      <span className="placeholder col-1" />
      <span className="placeholder col-1" />
      <span className="placeholder col-1" />

    </p> */}
      <div className='text-center'>Filter by category </div>

     <p className="card-text placeholder-glow">
      <span className="placeholder col-7" />
      <span className="placeholder col-4" />
      <span className="placeholder col-4" />
      <span className="placeholder col-6" />
      <span className="placeholder col-8" />
    </p>
    <div className='text-center mt-4'>Filter by price </div>

    <p className="card-text placeholder-glow">
      <span className="placeholder col-7" />
      <span className="placeholder col-4" />
      <span className="placeholder col-4" />
      <span className="placeholder col-6" />
      <span className="placeholder col-8" />
    </p>
       
  

{/*      
       <div className='d-flex flex-column'>     
         <span className="placeholder col-4" />
        <span className="placeholder col-4" />
        <span className="placeholder col-4" />


      </div> */}
      </div>

       <div className='col-md-9'>

       <div className='text-center'><h1>All Products</h1></div>
       <div className="row row-cols-1 row-cols-md-3 g-4">

       <div className="card  border-secondary card h-100 " aria-hidden="true">
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title placeholder-glow">
      <span className="placeholder col-6" />
    </h5>
    <p className="card-text placeholder-glow">
      <span className="placeholder col-7" />
      <span className="placeholder col-4" />
      <span className="placeholder col-4" />
      <span className="placeholder col-6" />
      <span className="placeholder col-8" />
    </p>

    <a className="btn btn-primary disabled placeholder col-4" aria-disabled="true" />&nbsp;&nbsp;
    <a className="btn btn-primary disabled placeholder col-4" aria-disabled="true" />  </div>
      </div>
      <div className="card  border-secondary card h-100" aria-hidden="true">
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title placeholder-glow">
      <span className="placeholder col-6" />
    </h5>
    <p className="card-text placeholder-glow">
      <span className="placeholder col-7" />
      <span className="placeholder col-4" />
      <span className="placeholder col-4" />
      <span className="placeholder col-6" />
      <span className="placeholder col-8" />
    </p>

    <a className="btn btn-primary disabled placeholder col-4" aria-disabled="true" />&nbsp;&nbsp;
    <a className="btn btn-primary disabled placeholder col-4" aria-disabled="true" />  </div>
      </div>
      <div className="card  border-secondary card h-100" aria-hidden="true">
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title placeholder-glow">
      <span className="placeholder col-6" />
    </h5>
    <p className="card-text placeholder-glow">
      <span className="placeholder col-7" />
      <span className="placeholder col-4" />
      <span className="placeholder col-4" />
      <span className="placeholder col-6" />
      <span className="placeholder col-8" />
    </p>
    <a className="btn btn-primary disabled placeholder col-4" aria-disabled="true" />&nbsp;&nbsp;
    <a className="btn btn-primary disabled placeholder col-4" aria-disabled="true" />
    
  </div>
      </div>
    </div>
      </div>


</div>


      
    </Layout>
  )
}

export default Load;
