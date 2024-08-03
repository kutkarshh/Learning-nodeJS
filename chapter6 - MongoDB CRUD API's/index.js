const express = require("express");
const { connectToDb } = require("./connection")
const { logReqRes } = require("./middlewares/plugins");
const userRouter = require("./routes/user");

const PORT = 3000;
const app = express();

// Using Middleware -- Plugin
app.use(express.urlencoded({ extended: false })) // Middleware to parse URL
app.use(express.json()) // Middleware to parse JSON
app.use(logReqRes("../log.txt")); // Middleware to Log Request and Response

// Connection to MongoDB Database
connectToDb("mongodb://127.0.0.1:27017/nodejs")
    .then(() => console.log("Connected to MongoDB!!"))
    .catch((err) => console.log("Mongo Error", err));

// Routes
app.use("/api/users", userRouter);
app.listen(3000, () => { console.log(`Server Started at PORT ${PORT}`) });