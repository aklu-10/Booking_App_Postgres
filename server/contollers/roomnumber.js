const SHA256 = require("crypto-js/sha256");
const pool = require("../db");
const { createError } = require("../utils/error");

exports.createRoomNumber = async (req, res, next) => {
    try {

        const room_id = req.params.room_id;
        let {number, unavailable_dates} = req.body;
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        let room_number_id = SHA256(current_date + random);
        room_number_id = room_number_id.words.join('');

        let roomnumber = await pool.query(
            `INSERT INTO roomnumber (room_number_id, room_id, number, unavailable_dates) VALUES ($1, $2, $3, $4) RETURNING *`, [room_number_id, room_id, number, unavailable_dates]
        );

        // await pool.query(
        //     `UPDATE guesthouse SET rooms = array_append(rooms, $1) where gh_id = $2 RETURNING *;`, [room.rows[0].room_id, gh_id]
        // )

        return res.status(201).json(roomnumber.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getRoomNumberByRoomId = async (req, res, next) => {
    try {

        let rooms = await pool.query(
            `SELECT * FROM roomnumber where room_id = $1;`, [req.params.room_id]
        );

        if (!rooms.rows.length)
            return next(createError(400, 'Room Not Found'))
        else
            return res.status(200).json(rooms.rows);

    } catch (err) {
        return next(err)
    }
};

exports.getAllRoomNumbers = async (req, res, next) => {
    try {
        console.log('All Room Numbers')
        let roomnumbers = await pool.query(
            `SELECT * FROM roomnumber;`
        )
        if (!roomnumbers.rows.length)
            return next(createError(400, 'No Rooms'))

        else
            return res.status(200).json(roomnumbers.rows);

    } catch (err) {
        return next(err)
    }
};

exports.deleteRoomNumber = async (req, res, next) => {
    try {

        let room = await pool.query(
            `DELETE FROM roomnumber where room_number_id = $1 RETURNING *;`, [req.params.id]
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