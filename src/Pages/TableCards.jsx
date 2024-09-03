import React from 'react';

function TableCards(props) {
  return (
        <div style={props.status===1? {backgroundColor: "black", color:"white" }: null} className='cards'>
            <h1 style={{fontFamily:"cursive"}}>{props.id}</h1>
            <h3>Occupied</h3>
        </div>
  )
}

export default TableCards;