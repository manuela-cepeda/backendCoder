import {fork} from 'child_process';
import express, { response } from "express";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

let visitas = 0

app.use(express.json());
app.get('/', (req,res)=> {
    res.send(`se ha visitado el sitio ${++visitas} veces`) 
})
app.get('/randoms',  (req, res)=>{   
    const cant =   req.query.cant || 100000000
    const child = fork('child.js')
    child.on('message', val => {
        if(val === 'listo'){
            child.send(cant)
            child.on('message', val => {
                res.send(val)   
            })
        }else{
            console.log( val)
        }
    })
   

})



