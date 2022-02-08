const router = require("express").Router();

//import model schema
const { UserFavourites } = require("../models/userFavourites");
const { Totem } = require("../models/totem");
const { User } = require("../models/user");

//=============== fetch all Totems by user id============ //
router.get("/:userid", async (req, res) => {
  const favTotems = await UserFavourites.findAll({
    //querying user favourites, pulling UserId column
    where: {
      UserId: req.params.userid,
    },
  });
  res.status(200).json(favTotems);
});
//=============== add favourite to a user============ //
router.post("/:userid/:totemid", async (req, res) => {
  //
  const user = await User.findOne({ where: { id: req.params.userid } });
  const totem = await Totem.findOne({ where: { id: req.params.totemid } });

  const favourite = await UserFavourites.create({
    UserId: user.id,
    TotemId: totem.id,
  });
  res.status(201).json(favourite);
});

module.exports = router;
