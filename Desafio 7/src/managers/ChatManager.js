
import fs from "fs";
import __dirname from "../utils.js";

const path =__dirname+'/files/chats.json';

export class ChatManager {

    getAll= async()=> {
        try{
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8');
                return JSON.parse(fileData)
            }else{
                return [];
            }
        }
        catch(err){
            console.log(`Cannot read file: ${err}`)
           
        }
    }

    save= async(newData)  =>{  
        try{
            const data = await this.getAll();
            if (data.length === 0 ) {
                newData.id = 1;
                data.push(newData);
                await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'));               
            } else {   
                newData.id =  data[data.length-1].id+1 ;
                data.push(newData);
                await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'));
                
            }
            return newData.id
        }
        catch(err){
            console.log(`Cannot write file: ${err}`)
        } 
      
    }

  
   
} 


