const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");
const { setLower, firstUpper } = require("./modelHelpers");

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
  },
  { indexed: [{ unique: true, fields: ["name"] }] }
);

module.exports = { Totem };
