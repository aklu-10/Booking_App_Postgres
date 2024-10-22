const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, deleteUser } = require('../contollers/user');
const { verifyToken, verifyAdmin } = require('../utils/verifyToken');

// CREATE
router.post('/', createUser)

// GET 
router.get('/:id', getUserById)

// // GET ALL
router.get('/', getAllUsers)

// // Delete
router.delete('/:id', deleteUser)

module.exports.userRouter = router;