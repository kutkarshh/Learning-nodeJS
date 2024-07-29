// Use Map instead of Object for better performance when dealing with large number of sessionIds as it uses hash table, which is faster for lookups compared to Object.
// Map provides better performance for large number of items, as it uses hash table internally, which is faster for lookups compared to Object.
// Object uses property names as keys to find the corresponding values, which can be slow for large number of items.
// Map allows for faster lookups and deletions of items, as it uses a hash function to determine the index of the item.
// Map can be used to store key-value pairs and provides methods like get(), set(), delete(), etc.
const sessionIdToUserMap = new Map();

function setUser(id, user) {
    sessionIdToUserMap.set(id, user)
}

function getUser(id) {
    // console.log(sessionIdToUserMap)
    return sessionIdToUserMap.get(id)
}

module.exports = { setUser, getUser }