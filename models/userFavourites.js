const connection = require("../connection");
const { Totem } = require("./totem");
const { User } = require("./user");

const UserFavourites = connection.define("User Favourites", {});

User.hasMany(UserFavourites);
Totem.hasMany(UserFavourites);

module.exports = { UserFavourites };
