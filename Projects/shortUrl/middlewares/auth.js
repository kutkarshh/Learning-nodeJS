const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;

    req.user = null;
    if (!tokenCookie) return next();

    const token = tokenCookie
    const user = getUser(token);
    console.log(user);
    req.user = user;
    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        console.log("Checking user:", req.user);
        if (!req.user) {
            console.log("No user found, redirecting to /login");
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.role)) {
            console.log("User role not authorized:", req.user.role);
            return res.status(403).end("You have no access. UnAuthorized");
        }
        console.log("User authorized:", req.user.role);
        return next();
    }
}


module.exports = { checkForAuthentication, restrictTo }