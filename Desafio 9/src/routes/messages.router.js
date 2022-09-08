import { Router } from "express";
import Chat from "../dao/MongoDAO/Chat.js";
import { normalize, schema } from "normalizr";

const router = Router();
const chatService = new Chat()

router.get('/', async (req, res)=>{   
    let chatMongo = {  
        id: 1,
        chats: await chatService.getAllPopulated()
    }

    const author = new schema.Entity('author')
    const message = new schema.Entity( 'messages', {
        author: author
    })
    const chat = new schema.Entity( 'chats', {
    messages:[message]
    })
    const normalizedData = normalize(chatMongo, chat)
    console.log(JSON.stringify(normalizedData,null,'\t'))
    res.send(normalizedData)
 })

export default router;