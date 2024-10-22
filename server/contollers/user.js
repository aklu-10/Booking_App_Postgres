const { SHA256 } = require("crypto-js");
const pool = require("../db");
const { createError } = require("../utils/error");

exports.createUser = async (req, res, next) => {
    try {

        const {username, email, password} = req.body;
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        let id = SHA256(current_date + random);
        id = id.words.join('');

        let user = await pool.query(
            `INSERT INTO users (id, username, email, password) VALUES($1, $2, $3, $4) RETURNING *;`, [id, username, email, password]
        );

        return res.status(201).json(user.rows);

    } catch (err) {
        return next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {

        let users = await pool.query(
            `SELECT * FROM users where id = $1`, [req.params.id]
        );

        if (!users.rows.length)
            return next(createError(404, 'Not Found'))
        else
            return res.status(200).json(users.rows);

    } catch (err) {
        return next(err);
    }
};


exports.getAllUsers = async (req, res, next) => {
    try {

        let users = await pool.query(
            `SELECT * FROM users`
        );

        if (!users.rows.length)
            return next(createError(204, 'No Content'))
        else
            return res.status(200).json(users.rows);

    } catch (err) {
        return next(err);
    }
};


exports.deleteUser = async (req, res, next) => {
    try {

        let users = await pool.query(
            `DELETE FROM users where id = $1 RETURNING *;`, [req.params.id]
        );

        if (!users.rows.length)
            return next(createError(404, 'Not Found'))
        else
            return res.status(200).json(users.rows);

    } catch (err) {
        return next(err);
    }
};
