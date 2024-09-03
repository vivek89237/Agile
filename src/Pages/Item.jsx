import React from 'react'
import { Link } from 'react-router-dom/dist'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function Item(props) {
    
  return (
    <div className="container">
         <div className="wrapper">
            <div className="banner-image"> </div>
            <h1 className='banner-title'>{props.Category}</h1>
            <p className='banner-desc'>{props.name}</p>
            </div>
    <div className="button-wrapper"> 
    <button className="btn fill">{props.price}</button>
    <button className="btn outline" onClick={()=>(props.deletef(props.id))}><DeleteIcon /></button>
    <button className="btn outline"><Link style={{color: "#00D4FF"}} to={`/Update/${props.id}`}><AddCircleRoundedIcon /></Link></button>
    </div>
    </div>

  )
}

export default Item