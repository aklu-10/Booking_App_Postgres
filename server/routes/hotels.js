const express = require('express');
const router = express.Router();
const { createGuestHouse, getGuestHouseById, getAllGuestHouses, deleteGuestHouse, countByCity, getFeaturedGuestHouses, getGuestHousesByCity, updateGuestHouse } = require('../contollers/hotel');

// Count by city
router.get('/countbycity', countByCity)


// featured
router.get('/featured', getFeaturedGuestHouses)

// featured
router.get('/city/:name', getGuestHousesByCity)

// CREATE
router.post('/', createGuestHouse)

// GET 
router.get('/:id', getGuestHouseById)

// GET ALL
router.get('/', getAllGuestHouses)

// PUT
router.put('/:id', updateGuestHouse)

// Delete
router.delete('/:id', deleteGuestHouse)

module.exports.hotelRouter = router;