import express from "express";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";

import __dirname from "./utils.js";
import {uploader} from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import  {FileManager}  from './managers/FileManager.js'

const fileService =  new FileManager();

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
app.use('/api/products', productsRouter);

// template engine config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use( uploader.single('thumbnail') )

const messages = [];
let products = await fileService.getAll();

io.on('connection', socket=> { 

    console.log('cliente conectado en socket' + socket.id)   
     
    socket.broadcast.emit('newUser')
    socket.emit('messages', messages );
    
    socket.on('new-message',data => {
        messages.push(data);
        io.emit('messages', messages);
    });

    socket.emit('products', products );

    socket.on('new-product', async () => {
        
        io.emit('products', products);
    });
    
})