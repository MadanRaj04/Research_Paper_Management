// middlewares/role.js
module.exports = function (roles = []) {
    if (typeof roles === 'string') roles = [roles];

    return (req, res, next) => {
        console.log(req.user.email);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied: Insufficient permissions' });
        }
        next();
    };
};
