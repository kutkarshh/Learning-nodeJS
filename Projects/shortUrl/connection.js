const mongoose = require("mongoose");

// Connection to MongoDB Database
async function connectToDb(url) {
    mongoose.connect(url)
}
mongoose.set('strictQuery', false);

module.exports = {
    connectToDb,
};