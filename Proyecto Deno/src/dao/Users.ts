import usersModel from "./models/User.ts";

export default class User{

    getUsers=()=>{
        return usersModel.find();
    }
    
    saveUser = (user:any)=> {
        return usersModel.create(user)
    }
}