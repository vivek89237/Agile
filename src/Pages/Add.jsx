import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import "./update.css";
import Button from '@mui/material/Button';

function Add() {
  const [val,setVal]=useState('')
  const data=[
      "Starters",
      "Desserts",
      "Beverages",
      "MainCourse"
  ]
  const [item, setItem] = useState({
    id: null,
    type:"",
    name:"",
    price: null
  })

  const handleChange = (event)=>{
     
      setItem((prevItem)=>({...prevItem, [event.target.name]: event.target.value }))
  }

  const navigate = useNavigate();

const handleClick= async(event)=>{
    
    event.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/post", item);
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='addItem'>
     <h1>Add a item</h1>
     <form action="/add" className='itemForm'>
     <input onChange={handleChange} type="number" name="id" placeholder='id' />
      {/* <input onChange={handleChange} type="text" name="type" placeholder='type' /> */}
      <div className="main">
            <input list="data" onChange={handleChange} type='text' name='type' placeholder="type" />
            <datalist id="data">
                {data.map((op)=><option>{op}</option>)}
            </datalist>
        </div>
      
      <input onChange={handleChange} type="text" name="name" placeholder='name' />
      <input onChange={handleChange} type="text" name="price" placeholder='price' />
      <Button className='form-button' variant='contained' type='submit' onClick={handleClick} style={{cursor:"pointer"}}>Submit</Button>
     </form>
    </div>
  )
}


export default Add;