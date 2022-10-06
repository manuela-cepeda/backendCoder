import {fork} from 'child_process';
import express from "express";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

app.use(express.json());

app.get('/randoms',  (req, res)=>{   
    const cant =   req.query.cant || 100000000
    const child = fork('child.js')
    child.send(cant)
    child.on('message', val => {
        res.send(val)
    })

})



