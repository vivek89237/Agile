import React,{useState} from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import { useLocation} from 'react-router-dom';
import "./update.css";

function Add() {
  const [item, setItem] = useState({
    type:"",
    name:"",
    price:null
  })
const {pathname} =useLocation();
const menuItemId = pathname.split("/")[2];
console.log(pathname.split("/")[2]);

  function handleChange(event){
      setItem((prevItem)=>({...prevItem, [event.target.name]: event.target.value }))
  }

  const navigate = useNavigate();

const handleClick= async(event)=>{
    
    event.preventDefault();
    try{
      const res = await axios.put("http://localhost:3000/"+menuItemId, item);
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='addItem' >
     <h1 >Update Item</h1>
     <form action="/add" className='itemForm'>
      <input onChange={handleChange} type="text" name="type" placeholder='type' value={item.type} />
      <input onChange={handleChange} type="text" name="name" placeholder='name' value={item.name} />
      <input onChange={handleChange} type="text" name="price" placeholder='price'  value={item.price}/>
      <button className="form-button" type='submit' onClick={handleClick}>Update</button>
     </form>
    </div>
  )
}

export default Add;