const express = require("express");
const router = express.Router();
const { handleCreateUser, handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user");

/* Routes */

// GET all users data, POST new user
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

// GET, UPDATE, AND DELETE users data by ID
router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;
