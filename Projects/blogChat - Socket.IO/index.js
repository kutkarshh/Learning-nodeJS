require("dotenv").config();
const http = require("http");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT;

// Importing Socket.io Module from Socket.io
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Setting Socket.io Events
io.on("connection", (socket) => {
    console.log("Connected to Socket.io Server!!", socket.id);
    socket.on("user-message", (message) => {
        console.log("A new User Message", message)
        io.emit("message", message);
    })
})


// Setting Static Files Folder to serve public files like images, css, js etc
app.use(express.static(path.resolve("./public")));

// Route Handler
app.get("/", (req, res) => {
    res.sendFile("/public/index.html");
})

server.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));