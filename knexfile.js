const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";
const userInfo = require("./user.info");

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "travel_buddy",
      ...userInfo,
    },
  },
  test: {
    connection: {
      database: "travel_buddy_test",
      ...userInfo,
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

const log = console.log;
console.log = (...args) => {
  if (!/FsMigrations/.test(args[0])) log(...args);
};

module.exports = { ...customConfig[ENV], ...baseConfig };
