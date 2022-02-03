const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");
const { setLower, firstUpper } = require("./modelHelpers");
const { Totem } = require("./totem");
const { User } = require("./user");

//User schema, table of users with passwords
const Location = connection.define(
  "Location",
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
//Book schema, table of books with passwords
module.exports = { Location };
