import express from "express";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";

import __dirname from "./utils.js";

import handlebars from "express-handlebars"
import { Server } from "socket.io";
import  {FileManager}  from './managers/FileManager.js'
import  {ChatManager}  from './managers/ChatManager.js'
import fs from 'fs';


const fileService =  new FileManager();
const chatService =  new ChatManager();

//inicializamos express y websocket
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});
const io = new Server(server)

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);

// template engine config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

const messages = await chatService.getAll();
let products = await fileService.getAll();

io.on('connection', socket=> { 

    console.log('cliente conectado en socket' + socket.id)   
     
    socket.broadcast.emit('newUser')
    socket.emit('messages',  messages );
    socket.emit('products',  products );

    socket.on('new-message',async (data) => {
        await chatService.save(data)
        io.emit('messages', messages);
    });


    socket.on('new-product', async (newProduct) => {
      const FileName = `${Date.now()}-${newProduct.filename}`;
      const file = __dirname + `/public/img/${FileName}`;
      let newProductWithImage = {
        title: newProduct.title, 
        price: newProduct.price, 
        thumbnail: `${FileName}`
      }
      fs.writeFileSync(file, new Buffer(newProduct.data.split(';base64,')[1], 'base64'))  
      await fileService.save(newProductWithImage)
        io.emit('products', products);
    });
    
})