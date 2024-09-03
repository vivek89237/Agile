const express = require("express");
const {Client} = require("pg");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const salt = 10;

const db = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"localhost",
    database:"postgres"
})

db.connect();

const verifyUser = (req, res, next)=>{
  const token = req.cookies.token;
  if(!token){
    alert("You are not authenticated");
    return res.json({Error: "You are not authenticated."});
  }else{
    jwt.verify(token, "jwt.secret.key2", (err, decoded) =>{
      if(err){
        return res.json({Error: "Token is not correct"})
      }else{
        req.name = decoded.name;
        next();
      }
    })
  }
}


app.post("/register", (req, res)=>{
  
   bcrypt.hash(req.body.password, salt, (err, hash)=>{
    if(err) return res.json({Error: "Error for hashing pass"});

    const values = [req.body.email, req.body.name, hash]
    const q = "Insert INTO Admin (email, name, password) values ($1, $2, $3)";// Admin
    db.query(q, values, (err, data)=>{
      if(err) return res.json({Error: "Inserting data error in server"});
      return res.json({Status: "Success"});
    })
  })
})

app.post("/login", (req, res) =>{
  const q = "SELECT * FROM Admin WHERE email=$1"; // Admin table
  const {email, password} = req.body;
  console.log(password);
  db.query(q, [email], (err, data)=>{
    
    if(err) return res.json({Error: "Fetching data error in server"});
    if(data.rows.length > 0){
      bcrypt.compare(password, data.rows[0].password, (err, response)=>{
        if(err) return res.json({Error: "Password compare error"});
        if(response){
          const name = data.rows[0].name;
          const token = jwt.sign({name}, "jwt.secret.key2", {expiresIn: "1d"});
          res.cookie('token', token);
          return res.json({Status: "Success"});
        }else{
          return res.json({Status: "Password do not matched"});
        }
      })
    }else{
      return res.json({Error: "No email existed"});
    }
  })
})

app.get("/logout", (req, res) =>{
  res.clearCookie("token");
  return res.json({Status: "Success"});
})

app.get("/verify", verifyUser, (req, res)=>{
  return res.json({Status: "Success", name: req.name});
})
app.post("/table-manage", (req, res)=>{
  const {id, status} = req.body;
    const q = "Insert Into Booking (id, status) values ($1, $2)"; // Booking table
    const values = [id, status];
    db.query(q, values, (err, data)=>{
        if(err) return res.json(err.message);
        return res.json("Table has been added successfully.")
    });
});
// app.get("/", (req, res)=>{
//     const q = "select * from Menu where id is not null";
//     const data = db.query(q, (err, data) => {
//         if(!err){
//           return res.json(data.rows)
//         }else{
//           return  res.json(err.message);
//         }
//     })
    
// })

app.get("/menu", (req, res)=>{
    const q = "select * from Menu where id is not null";
    const data = db.query(q, (err, data) => {
        if(!err){
          return res.json(data.rows)
        }else{
          return  res.json(err.message);
        }
    })
    
})
app.get("/table-manage", (req, res)=>{
    const q = "Select * from Booking";
    const data = db.query(q, (err, data) => {
        if(!err){
          return res.json(data.rows)
        }else{
          return  res.json(err.message);
        }
    })
    
})

app.post("/post", (req, res)=>{
    const {id, type, name, price} = req.body;
    const q = "Insert Into Menu (id, type, name, price) values ($1, $2, $3, $4)";
    const values = [id, type, name, price]
    db.query(q, values, (err, data)=>{
        if(err) return res.json(err.message);
        return res.json("Books has been added successfully.")
    })
    
})

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, name, price } = req.body;

  try {
    const updateQuery = `
      UPDATE menu
      SET type = $1, name = $2, price = $3
      WHERE id = $4
    `;

    const result = await db.query(updateQuery, [type, name, price, id]);

    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'An error occurred while updating the menu item' });
  }
});

app.delete("/:id", (req, res)=>{
    const itemId = req.params.id;
    const q = "Delete FROM Menu WHERE id=$1";
    db.query(q, [itemId], (err, data) =>{
        if(err) return res.json(err);
        else return res.json("Book has been deleted successfully");
    })
})

app.get("/sales", (req, res)=>{
  const q = "Select * from Sales";
  const data = db.query(q, (err, data) => {
      if(!err){
        return res.json(data.rows);
      }else{
        return  res.json(err.message);
      }
  });
});
 
app.listen(3000, (err)=> {
    if(err) console.log("eror");
    else console.log("Srever 3000");
})