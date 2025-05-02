const usersService = require("../services/users.services");
exports.registerUser = async (req, res) => {
    try {
        const { email, password, username, role, details } = req.body;
        console.log(email, password, role);
        await usersService.registerUser(email, password, username, role, details);
        res.status(201).json({
            status: true,
            message: "User Registered Successfully",
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};

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

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await usersService.loginUser(email, password);
        res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            user
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: err.message
        });
    }
};
