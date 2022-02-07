const router = require("express").Router();

//import model schema
const { UserFavourites } = require("../models/userFavourites");
const { Totem } = require("../models/totem");
const { User } = require("../models/user");

const { Sequelize } = require("sequelize");

//=============== fetch all Totems via the Totem table============ //
router.get("/:userid", async (req, res) => {
  const favTotems = await UserFavourites.findall;
  const totemsreturned = await Totem.findAll({
    where: { createdBy: req.params.id },
  });
  res.status(200).json({ totemsreturned });
});

module.exports = router;
