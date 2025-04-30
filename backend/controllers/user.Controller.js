const usersService = require("../services/users.services");

exports.registerUser = async (req, res) => {
    try {
        const payload = req.body;
        const { email, password } = payload;
        console.log(email, password);
        await usersService.registerUser(email, password); // Don't forget to await
        res.status(201).json({
            status: true,
            message: "User Registered Successfully",
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message || "Registration failed"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const payload = req.body;
        await usersService.updateUser(payload); // Add await here too
        res.status(201).json({
            status: true,
            message: "User updated successfully"
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message || "Update failed"
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await usersService.getUserById(userId);
        res.status(200).json({
            status: true,
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            message: err.message || "User not found"
        });
    }
};
