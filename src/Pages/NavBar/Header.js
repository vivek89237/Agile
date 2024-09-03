import React, { memo, useState } from "react";
import {useEffect} from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  //console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //console.log(isMatch);

    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3000/verify')
        .then(res =>{
           
            if(res.data.Status === "Success"){
                setAuth(true);
                //setName(res.data.name);
            }else{
                setAuth(false);
                navigate('/login')
            }
        })
        .then(err => console.log(err));
    }, [])

    const handleClick = ()=>{
        axios.get('http://localhost:3000/logout')
        .then(res=>{
          setAuth(false);
            // location.reload(true);
        }).catch(err => console.log(err));
    }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                ADMIN
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Link style={{color:"#DAFFFB", textDecoration:"none"}}  to="/"><Tab label="DASHBOARD" /></Link>
                <Link  style={{color:"#DAFFFB", textDecoration:"none"}}  to="/menu"><Tab label="MANAGE-MENU"/></Link>
                <Link style={{color:"#DAFFFB", textDecoration:"none"}}  to="/table-manage"><Tab label= "MANAGE-TABLE" /></Link>
                <Link style={{color:"#DAFFFB", textDecoration:"none"}}  to="/order"><Tab label="Take-Order" /></Link>
                <Link style={{color:"#DAFFFB", textDecoration:"none"}}  to="/sales"><Tab label= "SALES" /></Link>
              </Tabs>
              {!auth && <Button sx={{ marginLeft: "auto" }} variant="contained">
                <Link style={{color: "white",textDecoration:"none"}} to="/login">Login</Link>
              </Button>}
              {!auth &&
              <Button sx={{ marginLeft: "10px", textDecorationStyle: "none" }} variant="contained">
              <Link style={{color: "white", textDecoration:"none"}} to="/register">SignUp</Link>
              </Button>}
              {auth && 
              <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={handleClick}>
                <Link style={{color: "white", textDecoration:"none"}} to="/logout">Logout</Link>
              </Button>
              }
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default memo(Header);
