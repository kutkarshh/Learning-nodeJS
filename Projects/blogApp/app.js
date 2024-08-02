require("dotenv").config();

const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectToDb } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT;

// Connection to MongoDB Database
connectToDb(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB!!"))
    .catch((err) => console.log("Mongo Error", err));

// Static files middleware
app.use(express.static(path.resolve('./public')));

// Using Middleware
// Serve static files from the 'public' directory
app.use('/images/uploads', express.static('public/images/uploads'));

// Using Middleware -- Plugin
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

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
