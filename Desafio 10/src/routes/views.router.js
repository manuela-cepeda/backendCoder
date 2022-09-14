import { Router } from "express";
import User from "../dao/MongoDAO/User.js";

const router = Router();
const userService = new User()

let user ; 

router.get('/current',  async (req, res)=>{   
    if (  req.session.user) { 
        user = await userService.getByEmail(req.session.user)
        res.render('products', {userName: user.name})
    }else{          
        res.redirect ('login')
    }
})

router.get('/register',  (req, res)=>{   
    res.render('register')
})

router.get('/login',  (req, res)=>{   
    res.render('login')
})

router.get('/logout',  (req, res)=>{  
    
    if(user) {
        res.render('logout', {userName: user.name})
    }
    else{          
        res.redirect ('login')
    }
})




export default router;