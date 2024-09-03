import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import Button from '@mui/material/Button';
import SalesTable from "./SalesTable";
import { Link } from "react-router-dom";
export default function Sales() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const fetchALlBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/sales");
        console.log("Successfully fetched")
        setSales(res.data);
      } catch (err) {
        console.log("error");
      }
    }

    fetchALlBooks();
  }, [])
  console.log(sales);
  return (
    <div className='dashboardconatiner' >

      {/* <div className='salesdetail'>
        <h1 style={{ textAlign: "center" }}>Sales Info</h1>
        <SalesTable />
      </div>
      <div className='tabledetails' >
      <h1 style={{ textAlign: "center" }}>Sales Info</h1>
        <SalesTable />
      </div> */}

      <div className='manageTools' >
        <div className='withBtn'>
          <div className='managecard'>
            <FastfoodIcon style={{ fontSize: "4rem", cursor: "pointer" }} />
          </div>
          <Link to="/menu" ><Button variant='contained'>Manage Menu</Button></Link>
        </div>
        <div className='withBtn'>
          <div className='managecard'>
            <FoodBankIcon style={{ fontSize: "4rem", cursor: "pointer" }} />
          </div>
          <Link to="/order" ><Button variant='contained'>Take Order</Button></Link>
        </div>

      </div>

      <div className='manageTools2' >
        <div className='withBtn'>
          <div className='managecard'>
            <AttachMoneyIcon style={{ fontSize: "4rem", cursor: "pointer" }} />

          </div>
          <Link to="/sales" ><Button variant='contained'>View Sales</Button></Link>
        </div>
        <div className='withBtn'>
          <div className='managecard'>
            <TableRestaurantIcon style={{ fontSize: "4rem", cursor: "pointer", color: "green" }} />

          </div>
         <Link to="/table-manage" > <Button variant='contained'>Manage Table</Button></Link>
        </div>


      </div>

    </div>

  );
}