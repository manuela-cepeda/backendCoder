import { Router } from "express";
import Products from "../dao/MemoryDAO/Products.memory.js";

const router = Router();
const productsService = new Products()

router.get('/',  (req, res)=>{   
    res.render('products')
})


router.get('/api/products-test', async (req, res)=>{
    await productsService.populate(5)
    let products = await productsService.getAll()
    res.render('productsmock', {products})
})


export default router;