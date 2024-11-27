import React from 'react'
import Layout from './../components/Layout/Layout';
import { Link } from 'react-router-dom';
const PageNotfound = () => {
  return (
    <Layout title={'Page Not Found'}>

    
        <div className='pnf'>
          <h1 className='pnf-title'>404</h1>
          <h2 className='pnf-heading'>page not found</h2>
          <Link to='/' className='pnf-btn'>
            Go back
          </Link>
        </div>
      
    </Layout>
  )
}

export default PageNotfound
