import { Router } from "express";
import Chat from "../dao/MongoDAO/Chat.js";
import { normalize, schema } from "normalizr";
import { reemplaceId } from "../utils.js";
import logger from "../config/pino.config.js";


const router = Router();
const chatService = new Chat()

router.get('/', async (req, res)=>{   
    try{
        let chats = await chatService.getAllPopulated()
        const test =  reemplaceId(chats)
        let chatMongo = {  
            id: 1,
            messages: test
        }
    
        
        const author = new schema.Entity('authors')
        const message = new schema.Entity( 'messages', {
            author: author
        })
        const chat = new schema.Entity( 'chats', {
        messages:[message]
        })
        const normalizedData = normalize(chatMongo, chat)
        res.send(normalizedData)
        logger.info(` ruta: ${req.path} -- metodo: ${req.method}`); 

    }catch (err) {
        logger.error(` ${err.message}`); 
    }
 })

export default router;