const handleSubmit = (e) =>{
    e.preventDefault()
    let data = new FormData(registerForm)
    let obj = {};
    data.forEach((value, key) => obj[key]=value)
    fetch('api/sessions/register',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result=> result.json())
    .then(json => console.log(json))

}

let registerForm = document.getElementById('registerForm')
registerForm.addEventListener('submit',(e)=>handleSubmit(e))