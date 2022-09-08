import mongoose from "mongoose";

mongoose.connect('mongodb+srv://usercoder:agn4FmgwQtspTtSI@cluster0.4i2h2it.mongodb.net/?retryWrites=true&w=majority'
, err=>{
    if (err) throw new Error(`error conexion mongo atlas ${err}`)
    console.log('base conectada')
})

export default class MongoDBContainer{

    constructor(collection, schema){
        this.model =  mongoose.model(collection, schema)
    }
    
    getAll = async () => {      
        let results = await this.model.find();
        return results
  
    }

    getAllPopulated = async () => {      
        let results = await this.model.find().populate('author');
        return results
  
    }
    
    getById = async (id) => {
        let results = await this.model.findOne({   _id : id });
        console.log( )
        return results;
    };
  
    save = async (document)=> {
        let results = await this.model.create(document);
        return results.id;
    }

    update = async ( modifiedItem) => {
        const id = modifiedItem.id
        let results = await this.model.updateOne({_id : id }, {$set: modifiedItem });
        return results;
    };

    deleteById = async (id) => {
        let results = await this.model.deleteOne({ _id : id });
        return results;
    };
  

   
  
}