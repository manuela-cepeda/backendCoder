import User from "../dao/Users.ts";

const usersService = new User()

const getUsers = async (req:any,res:any) => {
    const result = await usersService.getUsers();
    res.send({status:"success", payload:result})
}

export default {
    getUsers
}