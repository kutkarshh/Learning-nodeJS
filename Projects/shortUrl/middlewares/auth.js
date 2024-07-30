const { getUser } = require("../services/auth");



async function restrictToLoggedInUserOnly(req, res, next) {
    // when using cookie authentication
    // const userId = req.cookies?.uid;
    // const user = getUser(userId);
    // if (!user) return res.redirect("/login");
    // req.user = user;
    // next();


    // when using response header authentication (which is Standard way of stateful authentication)
    const userId = req.headers["authorization"];
    if (!userId) return res.redirect("/login");
    const token = userId.split(" ")[1];

    const user = getUser(token);
    if (!user) return res.redirect("/login");

    console.log("Middleware:" + user);
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {

    // when using cookie authentication
    // const userId = req.cookies?.uid;
    // const user = getUser(userId);
    // req.user = user;

    // when using response header authentication (which is Standard way of stateful authentication)
    const userId = req.headers["authorization"];
    const token = userId.split(" ")[1];
    const user = getUser(token);
    req.user = user;

    next();
}

module.exports = { restrictToLoggedInUserOnly, checkAuth }