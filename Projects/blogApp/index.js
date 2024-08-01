const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const { connectToDb } = require("./connection");

const app = express();
PORT = 3000;

// Using Middleware
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection to MongoDB Database
connectToDb("mongodb://127.0.0.1:27017/blogosaurus")
    .then(() => console.log("Connected to MongoDB!!"))
    .catch((err) => console.log("Mongo Error", err));

// Routes
app.use("/user", userRoute);

app.get("/", (req, res) => {
    return res.render("home");
})

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));