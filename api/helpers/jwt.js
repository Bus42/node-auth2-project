const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../secrets"); // use this secret!

const generateToken = (user) => {
    const payload = {
        subject: user.user_id,
        username: user.username,
        role: user.role_name,
        iat: Date.now()
    }
    const options = {
        expiresIn: '1d',
    }
    const withToken = jwt.sign(payload, JWT_SECRET, options);
    return withToken;
}

module.exports = {
    generateToken,
};