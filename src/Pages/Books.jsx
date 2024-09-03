import React from 'react';
import {useEffect} from 'react';
import {useState } from 'react';
import axios from "axios";
import Item from "./Item";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";

function Books () {
    const [menu, setMenu] = useState([]);

    useEffect(()=>{
        const fetchALlBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/menu");
                console.log("Successfully fetched")
                setMenu(res.data);
            }catch(err){
                console.log("error");
            }
        }

        fetchALlBooks();
    }, [])

    const handleDelete = async (id)=> {
        try{
            await axios.delete("http://localhost:3000/"+id);
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div >
        <div className='items'>
            {menu.map((item, Index)=>(
                <div className='item'>
                    <Item key={Index} id={item.id} name={item.name} Category={item.type} price={item.price}  deletef={handleDelete}/>
                </div>
            ))}
            <div className='item' style={{display: "flex", justifyContent:"center", alignItems: "center" , width:"200px"}}>
                    <div className='container'>
                        <Link to="/post" ><Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab></Link>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Books