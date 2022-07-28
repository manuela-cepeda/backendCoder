import { Router } from "express";
import  {FileManager}  from '../managers/FileManager.js'

const fileService =  new FileManager();

const router = Router();


router.get('/products', async (req, res)=>{
    let products = await fileService.getAll();
    res.render('products',{
        hasProducts: products.length>0,
        products
    })
})

router.get('/',  (req, res)=>{   
    res.render('newProduct')
})


export default router;