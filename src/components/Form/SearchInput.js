import React from 'react'
import axios from 'axios';
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values,setValues] =useSearch();
    const navigate=useNavigate();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.get(`/api/products/search/${values.keyword}`)
            setValues({...values,result:data})

          navigate('/search')
        }
        catch(error){
            console.log(error);

        }
        
    }

  //   if(values?.result.length === 0){
  //     return <SearchLoad/>
  // }
  return (

     <form className="d-flex  mt-3" role="search" onSubmit={handleSubmit}>

      <input className="form-control me-2" type="search" 
      placeholder="Search with Product name" aria-label="Search" size={'70'} value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})} />
      <button className="btn btn-success" 
      type="submit">Search</button>
</form>

   
  )
}

export default SearchInput
