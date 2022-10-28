const mysql = require("mysql2")

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456Convit",
    database:"users_schema"
})

module.exports = pool.promise()
