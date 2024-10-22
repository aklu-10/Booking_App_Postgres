const SHA256 = require("crypto-js/sha256");
const pool = require("../db");
const { createError } = require("../utils/error");

exports.createRoom = async (req, res, next) => {
    try {

        const gh_id = req.params.guest_house_id;
        let {title, price, maxPeople, description} = req.body;
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        let room_id = SHA256(current_date + random);
        room_id = room_id.words.join('');

        let room = await pool.query(
            `INSERT INTO room (room_id, gh_id, title, price, maxPeople, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [room_id, gh_id, title, price, maxPeople, description]
        );

        await pool.query(
            `UPDATE guesthouse SET rooms = array_append(rooms, $1) where gh_id = $2 RETURNING *;`, [room.rows[0].room_id, gh_id]
        )

        return res.status(201).json(room.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getRoomById = async (req, res, next) => {
    try {

        let hotel = await pool.query(
            `SELECT * FROM room where room_id = $1;`, [req.params.id]
        )

        if (!hotel.rows.length)
            return next(createError(400, 'Room Not Found'))
        else
            return res.status(200).json(hotel.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getAllRooms = async (req, res, next) => {
    try {

        let room = await pool.query(
            `SELECT * FROM room;`
        )
        if (!room.rows.length)
            return next(createError(400, 'No Rooms'))

        else
            return res.status(200).json(room.rows);

    } catch (err) {
        return next(err)
    }
};

exports.deleteRoom = async (req, res, next) => {
    try {

        let room = await pool.query(
            `DELETE FROM room where room_id = $1 RETURNING *;`, [req.params.id]
        );

        if (!room?.rows?.length)
            return next(createError(400, 'Room Not Found'));

        await pool.query(
            `UPDATE guesthouse SET rooms = array_remove(rooms, $1) where gh_id = $2;`, [req.params.id, room.rows[0].gh_id]
        );

        return res.status(200).json(room.rows);

    } catch (err) {
        return next(err);
    }
};