const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const User = require("../models/user");

var isAdmin = false;

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({});
    const allUrlName = await Promise.all(
        allUrls.map(async (url) => {
            const user = await User.findById(url.createdBy);
            return {
                ...url.toObject(),
                createdByName: user ? user.name : "Unknown"
            }
        })
    )
    return res.render("home", { all_urls: allUrlName, name: req.user.name, role: "ADMIN" });
})

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // if (!req.user) return res.render("login");
    if (req.user.role === "ADMIN") isAdmin = true;
    else isAdmin = false;
    console.log(req.user.role, isAdmin);
    const myUrls = await URL.find({ createdBy: req.user._id });
    var allUrls = await URL.find({});
    allUrls = allUrls.filter((url) => !myUrls.some(myUrl => myUrl._id.toString() === url._id.toString()));
    return res.render("home", { all_urls: allUrls, my_urls: myUrls, name: req.user.name, admin: isAdmin });
});
router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async (req, res) => {
    return res.render("login");
});

router.get("/logout", async (req, res) => {
    console.log("User Logged out...");
    return res.clearCookie("token").redirect("/login");
});

module.exports = router;
