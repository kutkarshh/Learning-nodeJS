const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    if (myUrl.pathname === "/favicon.ico") res.end();
    const log = `${Date.now()} and ${req.url}: New Request Recieved`;
    fs.appendFile("log.txt", log + "\n", (err, data) => {
        if (err) console.log(err);
        switch (myUrl.pathname) {
            case "/":
                res.end("Home Page");
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`I'm ${username}`);
                break;
            case "/search":
                const query = myUrl.query.search_query;
                res.end(`Here are your results ${query}`);
                break;
            default:
                res.end("404 Not Found");
        }

    })
});

myServer.listen(3000, () => console.log("Server Started!!"));