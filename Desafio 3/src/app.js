import express from 'express';
import  {FileManager}  from './managers/FileManager.js';

const fileService=  new FileManager();

//inicializamos express
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

//obtenemos productos en url
app.get('/productos',async (req,res)=>{
    let productos = await fileService.getAll();
    res.send(` los productos son: /n
    ${JSON.stringify(productos)} `)
})


//obtenemos producto random
app.get('/productoRandom',async (req,res)=>{
    let id=Math.floor(Math.random()*3)+1
    let productById = await fileService.getById(id)
    res.send(` es producto de id: ${id} es:
    ${JSON.stringify(productById)} `)
})

   





