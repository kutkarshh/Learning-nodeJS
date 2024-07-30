// Use Map instead of Object for better performance when dealing with large number of sessionIds as it uses hash table, which is faster for lookups compared to Object.
// Map provides better performance for large number of items, as it uses hash table internally, which is faster for lookups compared to Object.
// Object uses property names as keys to find the corresponding values, which can be slow for large number of items.
// Map allows for faster lookups and deletions of items, as it uses a hash function to determine the index of the item.
// Map can be used to store key-value pairs and provides methods like get(), set(), delete(), etc.

// const sessionIdToUserMap = new Map();

/* Using JSON WEB TOKEN TO IMPLEMENT STATELESS AUTHENTICATION */
const jwt = require("jsonwebtoken")
// A unique set of key that can be used to sign and verify JWT tokens
// Or in simple terms can encode and decode the data
const secret = "myJS#2024LearningNodeJS";

function setUser(user) {  // using JWT no need for id
    // function setUser(id, user) {   // using Map
    // sessionIdToUserMap.set(id, user)
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);

}

function getUser(token) {   // parameter is id --> Map or token --> JWT
    // console.log(sessionIdToUserMap)
    // return sessionIdToUserMap.get(id)    // when using MAP for stateful authentication

    if (!token) return null;
    try {
        console.log("token" + jwt.verify(token, secret)[_id]);
        return jwt.verify(token, secret);   // verify the token is validated with the secret key
    }
    catch (err) {
        return null
    }
}

module.exports = { setUser, getUser }