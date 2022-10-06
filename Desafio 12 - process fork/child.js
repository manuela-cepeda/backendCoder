
process.on( 'message', cant => {
    console.log('entro?')
    const randomObj = random(cant)
    process.send(randomObj)
   
})




function random (cant) {
    const obj = {};
    for (let i = 0; i <cant; i++) {
        const key =  Math.floor((Math.random() * (1000 - 1 + 1)) + 1);        
        obj[key] = (obj[key]+1) || 1 ;
    }
    return obj; 
}