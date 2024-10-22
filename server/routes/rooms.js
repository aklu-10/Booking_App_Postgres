const express = require('express');
const { createRoom, getRoomById, getAllRooms, deleteRoom } = require('../contollers/room');
const router = express.Router();

// CREATE
router.post('/:guest_house_id', createRoom)

// GET 
router.get('/:id', getRoomById)

// GET ALL
router.get('/', getAllRooms)

// Delete
router.delete('/:id', deleteRoom)

module.exports.roomRouter = router;