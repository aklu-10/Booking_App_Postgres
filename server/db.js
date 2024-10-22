const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "rootdb",
    host: "localhost",
    port: 5432,
    database: "bookingers"
});

module.exports = pool;