import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:3000/')
        .then(res =>{
            console.log(res.data.Status)
            if(res.data.Status === "Success"){
                setAuth(true);
                setName(res.data.name);
                navigate('/login');
            }else{
                setAuth(false);
                setMessage(res.data.Error);
            }
        })
        .then(err => console.log(err));
    }, [])

    const handleClick = ()=>{
        axios.get('http://localhost:3000/logout')
        .then(res=>{
            location.reload(true);
        }).catch(err => console.log(err));
    }
  return (
    <div className='logout' style={{height: "100vh"}} margin="50%">
        {auth?
        <div>
            <h3>You are Authorized --- {name}</h3>
            <button className='btn' onClick={handleClick}>Logout</button>
        </div>
        :
        <div>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to="/login" className='btn'>Login</Link>
        </div>}
    </div>
  )
}

export default Logout