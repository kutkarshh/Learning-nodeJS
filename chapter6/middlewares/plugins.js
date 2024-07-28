const fs = require("fs");
const path = require("path");

// Using Middleware -- Plugin
function logReqRes(filename) {
    return (req, res, next) => {
        // console.log("This is my Middleware");
        fs.appendFile(path.join(__dirname, filename), `\n${Date.now()}, ${req.method} and ${req.url}`, (err) => {
            if (err) {
                console.error("Failed to log request/response:", err);
            }
            next();
        });
    }
}

module.exports = { logReqRes };
