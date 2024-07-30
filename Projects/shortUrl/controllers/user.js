const { v4: uuidv4 } = require("uuid")
const { setUser, getUser } = require("../services/auth");
const User = require("../models/user");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })
        .then((user) => {
            console.log("User Created", user);
            return res.redirect("/");
        })
        .catch((error) => {
            var msg = error.message.split(" ").splice(0, 1);
            if (msg === "E11000") msg = "User Already Exists!";
            else {
                msg = "Something went wrong!";
                console.log("Error", error.message);
            }
            return res.render("signup", { error: msg });
        })
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
        email,
        password
    })
    if (user) {
        console.log("User Logged in...");

        // const sessionId = uuidv4();
        // setUser(sessionId, user);
        // res.cookie("sessionId", sessionId, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
        // no need for sessionId when we using JWT Authentication

        const token = setUser(user);
        // if using cookie authentication
        // res.cookie("uid", token);
        // return res.redirect("/");

        // if using response header authentication (which is Standard way of stateful authentication)
        console.log(token);
        return res.json({ token }); // pass token as response
    }
    else {
        console.log("Error", "Wrong Credentials or User not Registered");
        return res.render("login", { error: "Wrong Credentials or User not Registered" });
    }
}

module.exports = {
    handleUserSignUp, handleUserLogin
}