import axios from "axios";
import { useEffect, useState } from "react";


export default function useCategory(){
    const [categories,setCategories]=useState([])
    //=====get category==============
    const getCategory=async()=>{
        try{
           const {data}=await axios.get('/api/category/get-category')
           setCategories(data?.category)
        }
        catch(error){
            console.log(error);

        }
    }
    useEffect(()=>{
        getCategory()
    },[]);
    return categories;
}