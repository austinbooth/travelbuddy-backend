const ENV = process.env.NODE_ENV || "development";
const db = require("knex");

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");

module.exports = db(dbConfig);
