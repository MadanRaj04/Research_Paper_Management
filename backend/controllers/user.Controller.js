const usersService = require("../services/users.services");
exports.registerUser = async (req, res) => {
    try {
        const payload = req.body
        const { email, password } = payload;
        console.log(email,password);
        usersService.registerUser(email, password);
        res.status(201).json({
            status: true,
            message: "User Registered Successfully",
        })
    }
    catch (error){
        res.json({
            status: false,
            messaage: error
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const payload = req.body;
        usersService.updateUser(payload);
        res.status(201).json({
            status: true,
            message:"user updated successfully"
        })
    }
    catch(err){
        res.json({
            status: false,
            message: err
        });
    }


}