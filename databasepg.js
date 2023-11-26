const { Pool } = require("pg");
const pool = new Pool({
    host: "localhost",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.portpg,
    connectionLimit: 10,
});


module.exports=pool;