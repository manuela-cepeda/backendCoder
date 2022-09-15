import { Router } from "express";
import User from "../dao/MongoDAO/User.js";
import { isValidPassword, createHash } from "../utils.js";

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
        password: createHash(password)
    }
     await userService.save(newUser)
     res.status(200).send({success: true, payload: {name, email }})
})


router.post('/login', async (req, res, next) => {
    const { email, password} = req.body
    if(!email || !password) return res.status(400).send({status:"error", error:"incomplete values"})
    const user = await userService.getByEmail(email)
    if(!user) return res.status(400).send({status:"error", error:"Incorrect credencials"})
    if(! isValidPassword(user, password)) return res.status(400).send({status:"error", error:"the password isn't correct"})
    req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
    }  
    res.status(200).send({success: true, payload: req.session.user})
     
})

router.get('/logout', async (req,res)=>{
	req.session.destroy(err=>{
		if(!err) res.send({success: true, payload: 'log out'})
		else res.send({status: 'Logout ERROR' ,body:err})
	})
})





export default router;