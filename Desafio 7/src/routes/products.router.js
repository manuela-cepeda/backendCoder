import { Router } from "express";
import  {FileManager}  from '../managers/FileManager.js';
import {uploader} from '../utils.js'

const router = Router();
const fileService=  new FileManager();

//se usa websocket en este desafio 
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


export default router; 