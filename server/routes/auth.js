const express = require('express');
const { registerUser, loginUser } = require('../contollers/auth');
const router = express.Router();

// CREATE
router.post('/register', registerUser)
router.post('/login', loginUser)

// GET 
// router.get('/:id', getUserById)

// // // GET ALL
// router.get('/', getAllUsers)

// // // Delete
// router.delete('/:id', deleteUser)

module.exports.authRouter = router;