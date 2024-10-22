const express = require('express');
const { createRoomNumber, getAllRoomNumbers, getRoomNumberByRoomId, deleteRoomNumber } = require('../contollers/roomnumber');
const router = express.Router();

// CREATE
router.post('/:room_id', createRoomNumber)

// GET 
router.get('/:room_id', getRoomNumberByRoomId)

// GET ALL
router.get('/', getAllRoomNumbers)

// // Delete
router.delete('/:id', deleteRoomNumber)

module.exports.roomNumberRouter = router;