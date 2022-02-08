const connection = require("../connection");
const { Totem } = require("./totem");
const { User } = require("./user");
const { Location } = require("./location");

const UserFavourites = connection.define("User Favourites", {});

User.hasMany(UserFavourites);
Totem.hasMany(UserFavourites);
UserFavourites.belongsTo(User);
Location.hasMany(Totem);
Totem.belongsTo(Location);

module.exports = { UserFavourites };
