import React, {useState} from 'react';
import {useEffect} from 'react';
import TableCards from './TableCards';
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from "@mui/icons-material/Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function Table() {
    const [tables, setTable] = useState([]);
    const [newTable, setNewTable] = useState({
        id: null,
        staus:null
    })
    useEffect(()=>{
        const fetchALlBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/table-manage");
                console.log("Successfully fetched")
                setTable(res.data);
            }catch(err){
                console.log("error");
            }
        }
        fetchALlBooks();
    }, [])
    
    const handleChange = (event)=>{
        setNewTable((prevItem)=>({...prevItem, [event.target.name]: event.target.value }))
    }
    const addTable = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:3000/table-manage", newTable);
        }catch(err){
            console.log("error");
        }
    }
  return (
    <div className='maintableContainer'>
        <div className='cardsContainer c1'>
         <form action="/addtable" className='tablecontainer'>
            
            <input onChange={handleChange} type="number" name="id" placeholder='id' value={newTable.id} />
            <input onChange={handleChange} type="number" name="status" placeholder='status' value={newTable.staus} />
            <Button variant='contained' type='submit' onClick={addTable} >Add</Button>
         </form>
         </div>
        <div className='cardsContainer c2'>
            <div className='listoftables'>
            {tables.map((table, Index)=>(
                <TableCards key={Index} id={table.id} status={table.status} />
            ))}
            </div>
            {/* <Link to="/post"><Fab><AddIcon /></Fab></Link> */}
    </div>
    </div>
  )
}

export default Table