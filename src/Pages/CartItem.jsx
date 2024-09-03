import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
function CartItem(props) {
    const [count, setCount] = useState(1);

    function handleIncrement(){
            setCount(count+1); 
            props.handlePrice(props.price)      
    }
    function handleDecrement(){
        if(count>1){
        setCount(count-1);
       props.handlePrice( - props.price);
        }else setCount(1);
    }
    function handleClick(){
      props.deletef(props.id)
      props.handlePrice(-props.price*count)
      
    }
  return (
    <div className='.cart-Items'>
        <h1 >{props.name}</h1>
        <div>{count}</div>
        <div>{props.price}</div>
        <button onClick={handleIncrement} >+</button>
        <button onClick={handleDecrement} >-</button>
        <button onClick={handleClick}><DeleteIcon /></button>
    </div>
  )
}

export default CartItem;