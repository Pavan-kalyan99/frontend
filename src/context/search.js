import {useState,useContext,createContext, useEffect} from 'react';
import axios from 'axios'
const SearchContext =createContext();

const SearchProvider = ({children}) => {
    const [auth,setAuth]=useState({
        keyword:"",
        result:[],
    });
    //default axios
    axios.defaults.headers.common['Authorization']=auth?.token;

    return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}
 
//custome hook
const  useSearch=()=>useContext(SearchContext);

export {useSearch,SearchProvider};