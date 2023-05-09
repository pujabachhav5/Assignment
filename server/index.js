const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql= require("mysql2");
const cors= require("cors");
const db= mysql.createPool({
    host: "localhost",
    user:"root",
    password: "tushar@1535",
    database: "product"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get",(req, res)=>{
    const sqlGet= "Select * from product_info";
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    });
});

app.post("/api/post",(req, res)=>{
   const { product_name, category_name}= req.body;
   const sqlInsert ="INSERT INTO `product_info` ( `product_name`, `category_name`) VALUES ( ?, ?)";
   
   db.query(sqlInsert,[product_name, category_name], (error,result)=>{
    if(error){
        console.log(error);
    }
    console.log(result)
   })
});

app.delete("/api/remove/:id",(req, res)=>{
    const { id }=req.params;
    const sqlRemove ="delete from product_info where id= ?";
    db.query(sqlRemove,id, (error,result)=>{
     if(error){
         console.log(error);
     }
    })
 });

 app.get("/api/get/:id",(req, res)=>{
    const { id }=req.params;
    const sqlGet= "Select * from product_info where id=?";
    db.query(sqlGet,id, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req, res)=>{
    const { id }=req.params;
    const{product_name,category_name}= req.body;
    const sqlUpdate= "update product_info set product_name= ?, category_name=? where id=?";
    // console.log(sqlUpdate); 
    db.query(sqlUpdate,[product_name,category_name,id], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


app.listen(5000, () => {
    console.log("server is running on port 5000");
})