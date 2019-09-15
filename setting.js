dotenv = require('dotenv')
const { Pool, Client } = require('pg')

dotenv.config()

EMAIL = process.env.EMAIL
PASSWORD = process.env.PASSWORD

DB_HOST = process.env.DB_HOST
DB_USER = process.env.DB_USER
DB_PASSWORD = process.env.DB_PASSWORD
DB_PORT = process.env.DB_PORT
DB_NAME = process.env.DB_NAME

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    timezone: '+07:00'
})
  

module.exports = {
    EMAIL,
    PASSWORD,
    pool
}