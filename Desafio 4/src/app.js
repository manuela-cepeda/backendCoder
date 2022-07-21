import express from "express";
import productsRouter from "./routes/products.router.js";


//inicializamos express
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

app.use(express.json());
app.use('/api/products', productsRouter);
app.use(express.static('public'));