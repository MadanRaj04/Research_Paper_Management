const UserModel = require("../models/user.model");

class UsersService{
    async registerUser(email,password)
    {
        const obj = {
            email,
            password
        };
        await UserModel.create(obj);
    }

    async updateUser(obj)
    {
        const id = obj._id;
        const existingUser = await UserModel.findById(id);
        if(!existingUser){
            throw new Error("User Not Found.")
        }
        existingUser.username = obj.username;
        existingUser.details = obj.details;
        await existingUser.save();
    }
    async getAllUsers()
    {
        const users = await UserModel.find();
        return users;
    }
    async deleteUserById(id)
    {
        const users = await UserModel.findByIdAndDelete(id);
        if(!users){
            throw new Error("User Not Found.")
        }
    }
    async getUserById(id) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error("User Not Found.");
        }
        return user;
    }
    async loginUser(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("User not found.");
        }
        if (user.password !== password) {
            throw new Error("Invalid password.");
        }
        return user;  // Login successful, return user data
    }
    
}

module.exports = new UsersService();
