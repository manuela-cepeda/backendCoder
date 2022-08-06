
const socket = io({
    autoConnect:false
});

//sweetAlert usuario
let user;
Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'ingresa el usuario con el que te identificaras en el chat',
    inputValidator: (value)=>{
        return !value && "Necesitas identificarte para continuar"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
    socket.connect();
})

//leyendo formulario
const addMessage = (e) => {
    e.preventDefault()
    const chatbox = document.getElementById('texto');
    const date = new Date();
     if(chatbox.value.trim().length>0){
         const mensaje = {
             author: user,
             text: chatbox.value,
             time :  date.toLocaleString()
         };
         socket.emit('new-message', mensaje);
         chatbox.value="";
     }
    return false;
}

const formChat = document.getElementById('formChat')
formChat.addEventListener('submit',(e)=>addMessage(e))

//renderizando mensajes
const renderChat = (data) => {
    console.log('render char')
    const html = data.map(elem => {
        return(`<div class="bg-light" >
        <strong  style="color:blue">${elem?.author}</strong>
        <em  style="color:brown">[${elem?.time}]</em>: 
        <em  style="color:green">${elem?.text}</em> 
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html ;
}
socket.on('messages', (data) => { renderChat(data) });



//new user
socket.on('newUser', data => {
    if(user){
        Swal.fire({
            text:"Nuevo usuario en el chat",
            toast:true,
            position: "top-right",
        })
    }
})
