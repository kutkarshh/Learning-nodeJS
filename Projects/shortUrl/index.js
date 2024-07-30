const express = require("express");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const path = require("path");
const { connectToDb } = require("./connection");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = 8001;

connectToDb("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log("Connected to MongoDB!!");
}).catch((err) => {
    console.log("Mongo Error", err);
});

// Setting Engine for View
app.set("view engine", 'ejs');

// Declaring Views Folder
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Auth Middleware
app.use(checkForAuthentication);

app.use("/", staticRoute);
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));