import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./Add";
import Books from "./Books";
import Update from "./Update";
import Header from "./NavBar/Header";
import Login from "./Login";
import Table from "./Table";
import Menu from "./Menu"
import DashBoard from "./DashBoard";
import CartItem from "./CartItem";
import Registration from "./Registration";
import Logout from "../Logout";
import Sales from "./Sales";

function App(){
    return (
        <div className = "App" style={{height:"100vh"}}>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <DashBoard />} />
                <Route path="/menu" element={<Books />} />
                <Route path="/table-manage" element={<Table />} />
                <Route path="/post" element={<Add />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/order" element={<Menu />} />
                <Route path="/cart" element={<CartItem />} />
                <Route path="/sales" element={<Sales />} />
            </Routes>
        </BrowserRouter>  
        </div>
    )
}

export default App;
