// Let's Learn Express
// const http = require("http");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    return res.end("Home Page");
})

app.get("/about", (req, res) => {
    const username = req.query.myname;
    return res.end(`I'm ${username}, Welcome to About Page`);
})

// Manual Way of Implementing
// const myServer = http.createServer(app);
// myServer.listen(3000, () => console.log("Server Started!!"))

// Express Way of Implementing
app.listen(port, () => console.log("Server Started!!"))