import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (children) => {
  return (
    <div className='footer'>
      <h4 className='text-center'>All rights Reserved &copy;2023</h4>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>
        <Link to='https://pk-blog-615a1.web.app/' target='_blank' >Blog</Link>
        <Link to='/policy'>Privacy Policy</Link>
        

      </p>
    </div>
  )
}

export default Footer
