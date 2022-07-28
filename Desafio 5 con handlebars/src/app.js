import express from "express";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"


//inicializamos express
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.static(__dirname+'/public'));

// template engine config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);


