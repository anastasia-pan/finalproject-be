const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");
const { setLower, firstUpper } = require("./modelHelpers");
const { Totem } = require("./totem");
const { Location } = require("./location");
const { User } = require("./user");

const UserFavourites = connection.define("User Favourites", {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totemID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { UserFavourites };
