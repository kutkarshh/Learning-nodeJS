const { Router } = require("express");
const User = require("../models/user");
const uploadImage = require("../services/imageUploader");
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        if (!token) return res.render("signin", { error: "Wrong Credentials" });
        console.log("User Logged in..", email);
        return res.cookie("token", token).redirect("/"); // pass token as response
    } catch (error) {
        return res.render("signin", { error: error.message });
    }
});

router.post("/signup", uploadImage.single("profileImage"), async (req, res) => {
    const { fullName, email, password } = req.body;
    // profile image location will be stored in uploads folder
    const profileImageURL = req.file ? `/uploads/user/${req.file.filename}` : null;
    // console.log(req.file);
    var user = { fullName, email, password, profileImageURL };
    try {
        // console.log(fullName, email, password, profileImageURL);
        if (profileImageURL === null)
            user = { fullName, email, password };
        await User.create(user);
        return res.redirect("/");
    } catch (error) {
        console.log("Error----> " + error.message);
        if (error.code === 11000) return res.render("signup", { error: "User Already Exists!" });
        return res.render("signup", { error: error.message });
    }
});

router.get("/profile", (req, res) => {
    if (!req.user) return res.redirect("/login");
    // console.log("Profile page: User - " + JSON.stringify(req.user));
    return res.render("profile", { user: req.user });
});

router.get("/logout", (req, res) => {
    console.log("User Logged out...");
    return res.clearCookie("token").redirect("/");
});

module.exports = router;