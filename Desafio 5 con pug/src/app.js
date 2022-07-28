import express from 'express'
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

//inicializamos express
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.static(__dirname+'/public'));

// template engine config
app.set('views', __dirname+'/views');
app.set('view engine','pug');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
