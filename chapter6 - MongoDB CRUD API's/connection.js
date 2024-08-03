const mongoose = require("mongoose");

// Connection to MongoDB Database
async function connectToDb(url) {
    mongoose.connect(url)
}

module.exports = {
    connectToDb,
};