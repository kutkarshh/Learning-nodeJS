const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        if (!token) return res.render("login", { error: "Wrong Credentials" });
        console.log("User Logged in..", token);
        return res.cookie("token", token).redirect("/"); // pass token as response
    } catch (error) {
        // console.log(error.message);
        res.render("signin", { error: error.message });
    }
})

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        await User.create({
            fullName,
            email,
            password
        })
    } catch (error) {
        console.log("Error----> " + error.message);
        if (error.code === 11000) return res.render("signup", { error: "User Already Exists!" });
        return res.render("signup", { error: error.message });
    }
    return res.redirect("/");
})

module.exports = router;