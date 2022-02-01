const { Sequelize } = require("sequelize");

let connection;

if (process.env.NODE_ENV === "PRODUCTION") {
  connection = new Sequelize(`${process.env.DATABASE_URL}?sslmode=no-verify`, {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  connection = new Sequelize(process.env.DATABASE_URL);
  console.log("DB connection successful");
}

module.exports = connection;
