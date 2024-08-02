const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectToDb } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = 3000;

// Static files middleware
app.use(express.static(path.resolve('./public')));

// Using Middleware
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Using Middleware -- Plugin
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection to MongoDB Database
connectToDb("mongodb://127.0.0.1:27017/blogosaurus")
    .then(() => console.log("Connected to MongoDB!!"))
    .catch((err) => console.log("Mongo Error", err));

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
