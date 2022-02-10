const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");
const { setLower, firstUpper } = require("./modelHelpers");
const { Location } = require("./location");
const { User } = require("./user");

const Totem = connection.define(
  "Totem",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("name");
        return firstUpper(rawValue);
      },
      set(value) {
        this.setDataValue("name", setLower(value));
      },
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    illustration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { indexed: [{ unique: true, fields: ["name"] }] }
);

User.hasMany(Totem);
Location.hasMany(Totem);
Totem.belongsTo(User);

module.exports = { Totem };
