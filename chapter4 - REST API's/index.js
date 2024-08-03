const express = require("express");
const fs = require("fs");
const path = require("path");
const users = require("./MOCK_DATA.json");
const PORT = 3000;
const app = express();

// Using Middleware -- Plugin
app.use(express.urlencoded({ extended: false }))
app.use(express.json()); // Middleware to parse JSON

app.use((req, res, next) => {
    console.log("This is my Middleware");
    fs.appendFile(path.join(__dirname, "../chapter4/log.txt"), `\n${Date.now()}, ${req.method} and ${req.url}`, () => {
        next();
    })
})

/* Routes */

// GET all users as HTML
app.get("/users", (req, res) => {
    const html = `<ul>
    ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>`;
    res.send(html);
})

/*      REST API's      */

// GET all users data
app.get("/api/users", (req, res) => {
    // Adding Custom Headers (Use X as Prefix)
    res.set("X-MyName", "Utkarsh Kumar");
    return res.json(users);
})

// POST new user
app.post("/api/users", (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ status: "Bad Request" });
    }
    users.push({ id: users.length + 1, ...body });
    fs.writeFile(path.join(__dirname, "../chapter4/MOCK_DATA.json"), JSON.stringify(users), (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "Error writing to file" });
        }
        // Using status code 201 to prompt that user has been created
        return res.status(201).json({ status: "Success User Created!!", id: users.length });
    });
})

// GET single user data
// app.route("/api/users/:id").get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id == id);
//     return res.json(user);
// })

// PATCH edit user
// app.patch("/api/users/:id", (req, res) => {
//     // TODO edit user
//     return res.send("User Edited");
// })

// DELETE user
// app.delete("/api/users/:id", (req, res) => {
//     // TODO delete user
//     return res.send("User Deleted");
// })

// Grouped get, patch, delete routes together as a single route call
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ status: "User Not Found" });
    }
    return res.json(user);
}).patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ status: "User Not Found" });
    }
    const updatedUser = { ...user, ...req.body };
    users[users.indexOf(user)] = updatedUser;
    fs.writeFile(path.join(__dirname, "../chapter4/MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "Error writing to file" });
        }
        return res.json({ status: "User Updated!!", id: id });
    });
}).delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ status: "User Not Found" });
    }
    const userDeleted = users.splice(userIndex, 1);
    fs.writeFile(path.join(__dirname, "../chapter4/MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "Error writing to file" });
        }
        return res.json({ status: "User Deleted!!", id: id, userDeleted: userDeleted });
    });
});

app.listen(3000, () => { console.log(`Server Started at PORT ${PORT}`) });