const JWT = require("jsonwebtoken"); // JSON WEB TOKEN
const JWT_SECRET = "myJS#2024LearningNodeJS";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, JWT_SECRET);
    return payload;
}

module.exports = { createTokenForUser, validateToken };