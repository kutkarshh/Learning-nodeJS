/* Using JSON WEB TOKEN TO IMPLEMENT STATELESS AUTHENTICATION */
const jwt = require("jsonwebtoken")
const secret = "myJS#2024LearningNodeJS";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);   // verify the token is validated with the secret key
    }
    catch (err) {
        return null
    }
}

module.exports = { setUser, getUser }