import knex from 'knex';


const sqliteOptions= {
    client: "sqlite3",
    connection:{
        filename: './sqliteDatabase.sqlite'
    },
    useNullAsDefault: true
}


let db = knex(sqliteOptions)

try{
    let productsExists = await db.schema.hasTable('products')
    if (productsExists){
        await db('products').del();
    }else {
        await db.schema.createTable('products', table =>{
            table.primary('id')
            table.increments('id')
            table.string('title',30)
            table.float('price')
            table.string('thumbnail',200)
        })
    
    }
    let messagesExists = await db.schema.hasTable('messages')
    if (messagesExists){
        await db('messages').del();
    }else {
 
        await db.schema.createTable('messages', table =>{
            table.primary('id')
            table.increments('id')
            table.string('author',30)
            table.string('text',200)
            // table.string('createdAt',30)
		
        })
    }
} catch (err){
    console.log(err);
}

export default db;