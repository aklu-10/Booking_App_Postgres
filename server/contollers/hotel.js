const SHA256 = require("crypto-js/sha256");
const pool = require("../db");
const { createError } = require("../utils/error");

exports.createGuestHouse = async (req, res, next) => {
    try {

        const { name, city, address, distance, photos, description, rating, rooms, cheapest_price, featured } = req.body;
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        let gh_id = SHA256(current_date + random);
        gh_id = gh_id.words.join('')

        let hotel = await pool.query(
            `INSERT INTO guesthouse (gh_id,  name, city, address, distance, photos, description, rating, rooms, cheapest_price, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, [gh_id, name, city, address, distance, photos, description, rating, rooms, cheapest_price, featured]
        )

        return res.status(201).json(hotel.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getGuestHouseById = async (req, res, next) => {
    try {

        let hotel = await pool.query(
            `SELECT * FROM guesthouse where gh_id = $1;`, [req.params.id]
        )

        if (!hotel.rows.length)
            return next(createError(404, 'Not Found'))
        else
            return res.status(200).json(hotel.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getAllGuestHouses = async (req, res, next) => {
    try {

        let hotels = await pool.query(
            `SELECT * FROM guesthouse;`
        )
        if (!hotels.rows.length)
            return next(createError(404, 'No Content'))

        else
            return res.status(200).json(hotels.rows);

    } catch (err) {
        return next(err)
    }
};


exports.updateGuestHouse = async (req, res, next) => {
    try {

        let sub_query = '';
        Object.keys(req.body).map(item=>{
            sub_query+=`${item} = ${req.body[item]}`
        });

        let hotel = await pool.query(
            `UPDATE guesthouse SET ${sub_query} where gh_id = $1 RETURNING *;`,[req.params.id]
        )

        if (!hotel.rows.length)
            return next(createError(404, 'Not Found'))
        else
            return res.status(200).json(hotel.rows);

    } catch (err) {
        return next(err)
    }
};


exports.deleteGuestHouse = async (req, res, next) => {
    try {

        let hotel = await pool.query(
            `DELETE FROM guesthouse where gh_id = $1 RETURNING *;`, [req.params.id]
        )

        if (!hotel.rows.length)
            return next(createError(404, 'Not Found'))
        else
            return res.status(200).json(hotel.rows);

    } catch (err) {
        return next(err)
    }
};

exports.countByCity = async (req, res, next) => {
    try {

        let {cities} = req.query;
        cities = cities.split(', ').map(item=>item?.toLowerCase());

        let guestHouses = await pool.query(
            `SELECT city, COUNT(*) as city_count FROM guesthouse where LOWER(city) = ANY($1) GROUP BY city ORDER BY city;`, [cities] 
        )
        if (!guestHouses.rows.length)
            return next(createError(404, 'No Content'))

        else
            return res.status(200).json(guestHouses.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getGuestHousesByCity = async (req, res, next) => {
    try {

        let {min, max} = req.query;

        let guestHouses = await pool.query(
            `SELECT * FROM guesthouse where LOWER(city) = $1 AND cheapest_price >= $2 AND cheapest_price <= $3;`, [req.params.name, min || 0, max || 999999] 
        )
        if (!guestHouses.rows.length)
            return next(createError(400, 'No Guest Houses Found'))

        else
            return res.status(200).json(guestHouses.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getFeaturedGuestHouses = async (req, res, next) => {
    try {

        let guestHouses = await pool.query(
            `SELECT * FROM guesthouse where featured = true;` 
        )
        if (!guestHouses.rows.length)
            return next(createError(400, 'No Featured Guest Houses'))

        else
            return res.status(200).json(guestHouses.rows);

    } catch (err) {
        return next(err)
    }
};