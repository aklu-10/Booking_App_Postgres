const { SHA256 } = require("crypto-js");
const pool = require("../db");
const { createError } = require("../utils/error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {

        const {username, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        let id = SHA256(current_date + random);
        id = id.words.join('');

        let user = await pool.query(
            `INSERT INTO users (id, username, email, password) VALUES($1, $2, $3, $4) RETURNING *;`, [id, username, email, hashedPassword]
        );

        return res.status(201).json(user.rows);
       
    } catch (err) {
        return next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {

        const {username, password} = req.body;

        let user = await pool.query(
            `SELECT * FROM users where username = $1;`, [username]
        );

        if(!user.rows.length)
            return next(createError(404, 'User not found'));

        const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);

        if(!isPasswordCorrect)
            return next(createError(400, 'Wrong password or username'));

        let {rows} = user;

        const token = jwt.sign({id: rows[0].id, isAdmin: rows[0].isadmin}, process.env.JWT)
        
        let {password: extracted_password, ...others} = rows[0];

        return res.cookie('access_token', token, {
            httpOnly: true
        })
        .status(200)
        .json([{...others}]);
       
    } catch (err) {
        return next(err);
    }
};