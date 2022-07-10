const FileManager = require('./managers/FileManager.js')

const fileService=  new FileManager();
const products = [
    {               
        title:'Escuadra',
        price:123.45,        
        thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
    {
        title:'Calculadora',
        price:234.56,
        thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    } ,   
    {
        title:'Globo Terráqueo',
        price: 345.67,
        thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }
];

const environment = async () => {



    console.log('Adding products')
    for (const product of products) {
        const id = await fileService.save(product)
        console.log(`New product ID: ${id}`)        
    };

    console.log('Getting data')
    const data = await fileService.getAll();
    console.log(data)

    console.log('Getting product by ID "2" ')
    let idFind= 2
    const productById = await fileService.getById(idFind)
    console.log(productById)


    console.log('Deleting product by ID "3" ')
    const idDelete = 3
    await fileService.deleteById(idDelete)

    console.log('Deleting all ') 
    await fileService.deleteAll()

  
    


    


    // console.log(" await deleteById (object= ", productos.length, ")  ", await fileService.deleteById(productos.length)??'');
    // for (let i=1; i<=productos.length; i++) {
    //     const oProducto = await fileService.getById(i) 
    //     if(oProducto)console.log(" async getById (idNumber= ", i, ") \nreturn :  ", oProducto);
    // }
    // console.log('\n====================================================================================\n')
    //     // console.log(`await deleteAll() ${await productService.deleteAll()?? ''}`);
    // console.log('\n====================================================================================\n')
    // const oProducto = await fileService.getAll();
    // console.log(" async getAll () \nreturn :  ", oProducto);

}
environment();
