
const socket = io();

//leyendo formulario 
let productForm = document.getElementById('productForm')

const handleSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    
    fetch(route,{
        method:"POST",
        body:formData
       
    }).then(res =>res.json()).then(json=>console.log(json)); 

    socket.emit('new-product' );
}

productForm.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/api/products'))


//renderizando mensajes
const render = (data) => {
    const html = data.map(product => {
        return(
        `<tr>   
        <td>${product?.title}</td>
        <td>${product?.price}</td> 
        <td><img src="img/${product.thumbnail ? product.thumbnail : 'no image_icon.png' }" </td> 
        </tr>`)
    }).join(" ");
   
    document.getElementById('products').innerHTML = html ;
}
socket.on('products', (data) => { render(data) });


