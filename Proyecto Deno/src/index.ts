import express from 'npm:express'; 
import mongoose from 'npm:mongoose';
import usersRouter from './routes/users.router.ts';

const app = express();
const connection = await mongoose.connect('mongodb://127.0.0.1:27017/deno') //error
app.listen(8080, ()=> console.log('listening on 8080'));

app.use(express.json());
app.use('/api/users', usersRouter)