const { getUser } = require("../services/auth");
async function restrictToLoggedInUserOnly(req, res, next) {

    const userId = req.cookies?.sessionId;

    const user = getUser(userId);
    if (!user) return res.redirect("/login");

    if (!userId) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {

    const userId = req.cookies?.sessionId;

    const user = getUser(userId);

    req.user = user;
    next();
}

module.exports = { restrictToLoggedInUserOnly, checkAuth }