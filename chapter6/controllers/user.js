const User = require("../models/schema"); // Adjust the path if necessary
/*      REST API's      */
async function handleCreateUser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ status: "Bad Request" });
    }
    try {
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        });
        return res.status(201).json({ status: "Success User Created!!", id: result._id });
    } catch (error) {
        return res.status(500).json({ status: "Error creating user", error: error.message });
    }
}

async function handleGetAllUsers(req, res) {
    try {
        const allUsers = await User.find({});
        return res.json(allUsers);
    } catch (error) {
        return res.status(500).json({ status: "Error fetching users", error: error.message });
    }
}

async function handleGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "User Not Found" });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ status: "Error fetching user", error: error.message });
    }
}

async function handleUpdateUserById(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                jobTitle: req.body.job_title
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ status: "User Not Found" });
        }
        return res.json({ status: "User Updated!!", id: req.params.id });
    } catch (error) {
        return res.status(500).json({ status: "Error updating user", error: error.message });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "User Not Found" });
        }
        return res.json({ status: "User Deleted!!", id: req.params.id });
    } catch (error) {
        return res.status(500).json({ status: "Error deleting user", error: error.message });
    }
}

module.exports = { handleCreateUser, handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById }