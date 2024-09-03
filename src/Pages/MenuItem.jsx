import React, { useState } from 'react'


function MenuItem(props) {
  const handleClick = ()=>{
    props.addToCart(props.self)
    props.handlePrice(props.price)
  }
  return (
    <div className="container">
         <div className="wrapper">
            <div className="banner-image"> </div>
            <h1 className='banner-title'>{props.type}</h1>
            <p className='banner-desc'>{props.name}</p>
            </div>
            <div className="button-wrapper"> 
            <button className="btn fill">Rs. {props.price}</button>
            <button className="btn outline" onClick={handleClick} >Add</button>
        </div>
    </div>

  )
}

export default MenuItem;