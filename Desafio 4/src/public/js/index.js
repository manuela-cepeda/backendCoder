let postForm = document.getElementById('postForm')

const handleSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    
    fetch(route,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>res.json()).then(json=>console.log(json)); 
}

postForm.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/api/products'))

let deleteForm = document.getElementById('deleteForm')
const deleteSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);    
    fetch(route+'/'+ obj.id,{
        method:"DELETE"
       
    }).then(res =>res.json()).then(json=>console.log(json));
}

deleteForm.addEventListener('submit',(e)=>deleteSubmit(e,e.target,'/api/products'))


let updateForm = document.getElementById('updateForm')
const updateSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
   
    fetch(route+'/'+obj.id,{
        method:"PUT",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>res.json()).then(json=>console.log(json));
}

updateForm.addEventListener('submit',(e)=>updateSubmit(e,e.target,'/api/products'))



