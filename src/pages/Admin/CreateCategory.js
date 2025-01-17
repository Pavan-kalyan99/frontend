import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';

import {Modal} from 'antd'




const CreateCategory = () => {
  const [categories, setCategories]=useState([ ]);
  const [name,setName]=useState(" ");
  const [visible,setVisible]=useState(false);
  const [select,setSelected]=useState(null);
  const [updatedName,setUpdatedName]=useState(" ");
  //form handle
  const submitHand=async(e)=>{
    e.preventDefault()
    try{
       const {data}=await axios.post('/api/category/create-category',{name})
       if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory()
       }
       else{
        toast.error(data.message)
       }
    }
    catch(error){
      console.log(error);
      toast.error('something wrong with input form')
    }
  }
  //get all category 
  const getAllCategory=async()=>{
    try{
      const {data}=await axios.get(`/api/category/get-category/`)
      if(data?.success){
        setCategories(data?.category);
      }

    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong in creating category");
    }
  }
useEffect(()=>{
  getAllCategory();
},[])

//updated category
const handleUpdated=async(e)=>{
  e.preventDefault();
  try{
    const {data}=await axios.put(`/api/category/update-category/${select._id}`,{name:updatedName});
   console.log("updated category",data)
    if(data.success){
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    }
    else{
      toast.error(data.message)
    }

  }
  catch(error){
    console.log("something went wrong")
  }
}
//delete category
const handleDeleted=async(pid)=>{

  try{
    const {data}=await axios.delete(`/api/category/delete-category/${pid}`)
    
    if(data.success){
      toast.success(`category is deleted`);
    
      getAllCategory();
    }
    else{
      toast.error(data.message)
    }

  }
  catch(error){
    console.log("something went wrong")
  }
}




  return (
    <Layout title={'Dashboard - create Category'}>
             <div className='container-fluid m-3 p-3'>
             <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>

                </div>
                <div className='col-md-9'>
              
                        <h1>Manage Category</h1>
                        <div className='p-3'>
                           <CategoryForm submitHand={submitHand} value={name} setValue={setName}/>
                        </div>
                        <div className='w-75'>
                            <table className="table">
                              <thead>
                                <tr>
                  
                                  <th scope="col">Name</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categories?.map((c)=>(
                                  <>
                               <tr>
                                  <td key={c._id}>{c.name}</td>
                                  <td><button className='btn btn-primary ms-1' onClick={()=>{
                                    setVisible(true);
                                  setUpdatedName(c.name);
                                  setSelected(c);}}>Edit</button></td>
                                  <td><button className='btn btn-danger ms-1' onClick={()=>{
                                    handleDeleted(c._id)
                                  }}>Delete</button></td>
                               </tr>
                                  </>
                                ))}
                              </tbody>
                              
                            </table>

                        </div>
                        <Modal onCancel={()=>setVisible(false)} 
                        footer={null}
                         open={visible}>
                          <CategoryForm value={updatedName} setValue={setUpdatedName} submitHand={handleUpdated}/>
                        </Modal>
           
                    

               </div>

            </div>
            </div>
    </Layout>
  )
}

export default CreateCategory
