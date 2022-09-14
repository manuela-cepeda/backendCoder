
let logout = document.getElementById('logout')
logout?.addEventListener('click',(e)=>{
    e.preventDefault()
    const response  = fetch('api/sessions/logout')
    .then(result=>result.json())
    if (response)  location.assign('/logout');
    
})

