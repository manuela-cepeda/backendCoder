import { Router } from "express";
import  {FileManager}  from '../managers/FileManager.js';

const fileService=  new FileManager();

const router = Router();

router.get('/', async (req,res)=>{  
    let products = await fileService.getAll(); 
    res.send({products})
})


router.get('/:id',  async (req,res)=>{
    let products = await fileService.getAll(); 
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});    
    let product = await fileService.getById((id))
    if(product == undefined ) return res.status(400).send({error:"producto no encontrado"});
     res.send({product})
})

router.post('/', async (req,res)=>{
  let newProduct = req.body;
  if(!newProduct.title || !newProduct.prices) return res.status(400).send({error:"invalid"});
  await fileService.save(newProduct)
  res.send({status:'success', message: 'product added'})
})

router.put('/:id', async  (req,res)=>{
    let products = await fileService.getAll(); 
    let product= req.body
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});
    // if(id<1 || id>products.length ) return res.status(400).send({error:"producto no encontrado"});no funciona cuando borro elementos por el medio 
    await fileService.update(product, id)
    res.send({status:'success', message: 'product updated'})
})

router.delete('/:id',  async (req,res)=>{
    let products = await fileService.getAll(); 
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});
    // if(id<1 || id>products.length ) return res.status(400).send({error:"producto no encontrado"}); no funciona cuando borro elementos por el medio   
    await fileService.deleteById(id)
    res.send({status:'success', message: 'product deleted'})
   
})



export default router; 