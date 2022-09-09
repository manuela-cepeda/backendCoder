import express, { text } from "express";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import fs from 'fs'
import Products from "./dao/MongoDAO/Products.js";
import Chat from "./dao/MongoDAO/Chat.js";
import Users from "./dao/MongoDAO/Users.js";




//inicializamos express y websocket
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});


app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);
app.use('/api/messages', messagesRouter);

// template engine config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

const io = new Server(server)
const productsService = new Products()
const chatService = new Chat()
const usersService = new Users()

let products = await productsService.getAll();
let messages = await chatService.getAll();

io.on('connection', socket=> { 

    console.log('cliente conectado en socket' + socket.id)   
     
    socket.broadcast.emit('newUser')
    socket.emit('messages',  messages );
    socket.emit('products',  products );

    socket.on('new-user',async (data) => {
      const result = await usersService.save(data)
      console.log(result)
      io.emit('user', result);
  });

    socket.on('new-message',async (data) => {
        await chatService.save(data)
        let allMessages = await  chatService.getAllPopulate();
        io.emit('messages', allMessages);
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
      await  productsService.save(newProductWithImage)
      let allProducts =  await  productsService.getAll();
        io.emit('products', allProducts);
    });
    
})