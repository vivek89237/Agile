import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import MenuItem from './MenuItem';
import CartItem from './CartItem';
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
function Menu() {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilter] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setPrice] = useState(0);
    const [isClick, setClick] = useState(false);
    
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get("http://localhost:3000/menu");
                console.log("Successfully fetched")
                setMenu(res.data);
                setFilter(res.data)
            } catch (err) {
                console.log("error");
            }
        }

        fetchMenu();
    }, [])
    
    

    function addToCart(newitem) {
        var flag = false;
        cart.map((cartitem) => {
            if (cartitem.id === newitem.id) flag = true;
        })
        if (!flag) {
            setCart((prev) => {
                return [...prev, newitem]
            })
        } else setCart(cart)
    }

    function handlePrice(newPrice) {
        setPrice(totalPrice + newPrice);
    }
    
    function handleCart() {

    }

    const handleCategory = (categ)=>{
        const updatedMenu = menu.filter((item)=>{
            return item.type === categ;
        })
        setFilter(updatedMenu);
    }

    function hancleCartLogo(){
        setClick(!isClick);
    }

    function handleDelete(id) {
        setCart(prev => {
            return prev.filter((menuItem) => {
                return menuItem.id !== id;
            });
        });
        cart.map((item) => {
            if (item.id === id) handlePrice(-item.price)
        })
    }
    return (
    <>
            <div style={{position:"fixed", zIndex:"3", color:"#176B87", width:"95%", display:'flex', justifyContent:"flex-end", marginTop:"2%"}} >
            <Badge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon style={{fontSize:"4rem", cursor:"grab"}} onClick={hancleCartLogo} />
            </Badge>
            
            </div>
            
        <div className='menuCartContainer'>
            <div className='Shopping-cart' >
                {isClick && cart.map((cartItems, Index) => {
                    
                    return <CartItem key={Index} id={cartItems.id} name={cartItems.name} price={cartItems.price} deletef={handleDelete} totalPrice={totalPrice} handlePrice={handlePrice} />
                })}
                {isClick&&<div>{totalPrice}</div>}
               { isClick && <button onClick={handleCart} >CheckOut</button>}
            </div>
             
            <div style={{zIndex:"3", width:"100%", display:"flex", justifyContent:"center", marginTop:"3%" }}>
            <Stack spacing={2} direction="row" >
                <Button variant="contained" color='grey' onClick={() => handleCategory("Starters")}>Starters</Button>
                <Button variant="contained" color='grey' onClick={() => handleCategory("Beverages")}>Beverages</Button>
                <Button variant="contained" color='grey' onClick={() => handleCategory("Desserts")}>Deserts</Button>
                <Button variant="contained" color='grey' onClick={() => handleCategory("MainCourse")}>MainCourse</Button>
            </Stack>
            </div>
            

            <div className='items'>
                {filteredMenu.map((menuItem, Index) => (
                    <div className='item'>
                        <MenuItem key={Index} id={menuItem.id} name={menuItem.name} type={menuItem.type} price={menuItem.price} self={menuItem} addToCart={addToCart} handlePrice={handlePrice} />
                    </div>
                ))}
            </div>
        </div>
        
    </>
    )
}

export default Menu;