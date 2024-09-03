import * as React from 'react';
import {useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SaleCard from './SaleCard';
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'CustomerName', width: 250 },
  { field: 'table_id', headerName: 'Table_id', width: 130 },
  { field: 'order_id', headerName: 'Order_id', width: 130 },
  {
    field: 'amount',
    headerName: 'Amount(₹)',
    type: 'number',
    width: 90,
  },
  { field: 'date', headerName: 'Date', width: 170 }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // }
];




// const rows = [
//   { id: 1, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 2, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 3, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 4, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 5, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 6, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 7, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
//   { id: 8, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35},
//   { id: 9, name: 'Snow Lannister', table_id:"#t01", order_id:"#O04", amount: 35 },
// ];

export default function Sales() {
  const [sales, setSales] = useState([]);
  useEffect(()=>{
    const fetchALlBooks = async ()=>{
        try{
            const res = await axios.get("http://localhost:3000/sales");
            console.log("Successfully fetched")
            setSales(res.data);
        }catch(err){
            console.log("error");
        }
    }

    fetchALlBooks();
}, [])
console.log(sales);
  return (
    <div style={{ backgroundColor:"black", display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100vh"}}>
      <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"10%"}}>
        <SaleCard name="Daily Sales" data="15030" />
        <SaleCard name="Monthly Sales" data="1232332" />
        <SaleCard name="Yearly Sales" data="2324345" />
      </div>
      

      <div style={{ height: 400, width: '100%' , backgroundColor:"white", marginTop:"4%"}}>
          <DataGrid
            rows={sales}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
      </div>
    </div>
    
  );
}