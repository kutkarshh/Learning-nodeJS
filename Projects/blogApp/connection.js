const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connectToDb(url) {
    mongoose.connect(url);
}

module.exports = {
    connectToDb,
};