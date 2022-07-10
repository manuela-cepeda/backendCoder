
import fs from "fs";

const path ='src/files/productos.json';


export class FileManager {

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

    getById= async(id) => {
        try {
            const data = await this.getAll();
            return data.find((element) => element.id == id);
            
        } catch (err) {
            console.log(`Cannot find by id: ${err}`)
        }
    }

    deleteById= async(id) => {
        try {
            const data = await this.getAll();
            const newArray = data.filter((element) => element.id != id);
            await fs.promises.writeFile(path, JSON.stringify(newArray, null, '\t'));
            
        } catch (err) {
            console.log(`Cannot delete by id: ${err}`)
        }
    }

    deleteAll= async() => {
        try {           
            await fs.promises.writeFile(path, JSON.stringify([], null, '\t'));
            
        } catch (err) {
            console.log(`Cannot delete all: ${err}`)
        }
    }
    
   
} 


