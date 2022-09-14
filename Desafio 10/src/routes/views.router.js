import { Router } from "express";
import User from "../dao/MongoDAO/User.js";

const router = Router();
const userService = new User()



router.get('/',  async (req, res)=>{   
    if (  req.session.user) { 
        const {name} = await userService.getByEmail(req.session.user)
        res.render('products', {name})
    }else{          
        res.send('please log in')
    }
})

router.get('/register',  (req, res)=>{   
    res.render('register')
})

router.get('/login',  (req, res)=>{   
    res.render('login')
})

router.get('/logout',  (req, res)=>{   
    res.render('logout')
})




export default router;