import { Router } from "express";
import  {FileManager}  from '../managers/FileManager.js';
import {uploader} from '../utils.js'

const router = Router();
const fileService=  new FileManager();

router.post('/', uploader.single('thumbnail'), async (req,res)=>{
    let {title, price} = req.body;
    if(!req.file) return res.status(500).send({status:"error", error:"couldn't upload file"})
    if(!title || !price) return res.status(400).send({error:"invalid"});
    let newProduct = {
        title,
        price,
        thumbnail: req.file.filename,
    }
    await fileService.save(newProduct)
    res.send({status:'success', message: 'product added'})
 
  })

//de desafios anteriores: 

router.get('/', async (req,res)=>{  
    let products = await fileService.getAll(); 
    res.send({products})
})

router.get('/:id',  async (req,res)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});    
    let product = await fileService.getById((id))
    if(product == undefined ) return res.status(400).send({error:"producto no encontrado"});
     res.send({product})
})



router.put('/:id', async  (req,res)=>{
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