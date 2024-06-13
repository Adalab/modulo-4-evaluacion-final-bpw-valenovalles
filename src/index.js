const express= require("express");
const cors = require("cors");
const mysql= require("mysql2/promise");

require("dotenv").config();

const server = express();
server.use(cors());
server.use(express.json());

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server is running in port: http://localhost:${PORT}`);
});

async function getConnection(){
    const conex = await mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "kbeauty"
    });
    await conex.connect();
    return conex;
}

//Endpoint agregar producto
server.post("/products/new", async (req, res)=>{
    const {name, category, descrip, ingredients, skinType} = req.body;
    const conn = await getConnection();
    const sqlInsert = "INSERT INTO products (name, category, descrip, ingredients, skinType) values (? ,? ,? ,? ,? )";
    const [newProduct] = await conn.query(sqlInsert, [name, category, descrip, ingredients, skinType]);
    res.status(200).json({
        success: true, 
        message: "Producto agregado con éxito",
        id: newProduct.insertId
    })
    await conn.end();
});

//Endpoint de consultar todos los elementos
server.get("/products", async(req, res)=>{
    try{
        const conn = await getConnection();
        const select = "SELECT * FROM products";
        const [result] = await conn.query(select)
        
        res.status(200).json({
            info: {count: result.length},
            results: result,
        })
        await conn.end();
    } catch (error){
        res.status(400).json(error);
    }
});

//Endpoint filtrado por tipo de piel
server.get("/products/:skinType", async (req, res)=>{
    const {skinType}= req.params;
    const conn = await getConnection();
    const select = "SELECT * FROM products WHERE skinType = ?";
    const [result] = await conn.query (select, [skinType]);
    res.status(200).json({
        info: {count: result.length},
        results: result[0], 
    });
    await conn.end();
});


//endpoint para modificar un producto por el id
server.put("/products/:id", async (req, res)=>{
    const conn = await getConnection();
    const productId = req.params.id;
    const updateProduct = req.body;

    const sqlUpdate = "UPDATE products SET name = ?, category = ?, descrip = ?, ingredients = ?, skinType = ? WHERE id = ?";
    const [result]= await conn.query(sqlUpdate, [updateProduct.name, updateProduct.category, updateProduct.descrip, updateProduct.ingredients, updateProduct.skinType, productId]);
    
    if(result.affectedRows >0 ){
        res.status(200).json({success:true, message: "Producto actualizado con éxito"});
    } else{
        res.status(400).json({success:false, message: "No se encontró producto para actualizar"});
    };
    await conn.end();
});

//endpoint borrar producto
server.delete("/products/:id", async (req, res)=>{
    const conn = await getConnection();
    const productId = req.params.id;
    const sqlDelete = "DELETE FROM products WHERE id = ?";
    const [result]= await conn.query(sqlDelete, [productId]);
    
    if(result.affectedRows >0 ){
        res.status(200).json({success:true, message: "Producto borrado"});
    } else{
        res.status(400).json({success:false, message: "No existe producto con ese id"});
    };
    await conn.end();
});
