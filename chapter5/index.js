const express = require("express");
const mongoose = require("mongoose");
const User = require("../chapter5/schema.js");
const PORT = 3000;
const app = express();

// Using Middleware -- Plugin
app.use(express.urlencoded({ extended: false }))
app.use(express.json()); // Middleware to parse JSON

// Connection to MongoDB Database
mongoose.connect("mongodb://127.0.0.1:27017/nodejs")
    .then(() => console.log("Connected to MongoDB!!"))
    .catch((err) => console.log("Mongo Error", err));

/* Routes */

// GET all users as HTML
app.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    const html = `<ul>
    ${allUsers.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
})

/*      REST API's      */

// GET all users data
app.get("/api/users", async (req, res) => {
    const allUsers = await User.find({});
    return res.json(allUsers);
})

// POST new user
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ status: "Bad Request" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    return res.status(201).json({ status: "Success User Created!!", id: result._id });
})

app.route("/api/users/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
            .catch((err) => console.log(err.message + " User Not Found"));
        if (!user) {
            return res.status(404).json({ status: "User Not Found" });
        }
        return res.json(user);
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(
            id,
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                jobTitle: req.body.job_title
            })
            .catch((err) => console.log(err.message + " User Not Found"));
        console.log(user);
        return res.json({ status: "User Updated!!", id: id });
    }).delete(async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id)
            .catch((err) => console.log(err.message + " User Not Found"));
        console.log(user);
        return res.json({ status: "User Deleted!!", id: id });
    });

app.listen(3000, () => { console.log(`Server Started at PORT ${PORT}`) });