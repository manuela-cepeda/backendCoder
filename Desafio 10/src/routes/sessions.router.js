import { Router } from "express";
import User from "../dao/MongoDAO/User.js";
// import { createHash } from "../utils.js";
import session from 'express-session';

const router = Router();
const userService = new User()


router.post('/register', async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) return res.status(400).send({status:"error", error:"incomplete values"})
    const exists = await userService.getByEmail(email)
    if(exists) return res.status(400).send({status:"error", error:"the user alredy exists"})
    const newUser = { 
        name,      
        email,
        password
        // password: createHash(password)
    }
     await userService.save(newUser)
     res.status(200).send({userName: name})
})


router.post('/login', async (req, res, next) => {
    const { email, password} = req.body
    if(!email || !password) return res.status(400).send({status:"error", error:"incomplete values"})
    const user = await userService.getByEmail(email)
    if(!user) return res.status(400).send({status:"error", error:"the user doesn't exist"})
    if(user.password !== password) return res.status(400).send({status:"error", error:"the password isn't correct"})
    req.session.user = email  
      res.status(200).send({userName: user.name})


     
})

router.get('/logout', async (req,res)=>{
  
	req.session.destroy(err=>{
		if(!err) res.send({response: 'log out'})
		else res.send({status: 'Logout ERROR' ,body:err})
	})
})





export default router;