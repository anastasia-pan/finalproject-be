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
  console.log(req.params.userid);
  let favouriteTotems = [];
  for (let i of favTotems) {
    let newTotem = await Totem.findOne({
      where: { id: i.TotemId },
    });
    const location = await newTotem.getLocation();
    let newnewTotem = {
      ...newTotem.get({ plain: true }),
      location: location.name,
    };
    favouriteTotems.push(newnewTotem);
  }
  res.status(200).json(favouriteTotems);
});
//=============== add favourite to a user============ //
router.post("/:userid/:totemid", async (req, res) => {
  console.log(req.params);
  console.log(req.params.userid);
  const user = await User.findOne({
    where: { id: req.params.userid },
  });
  const totem = await Totem.findOne({
    where: { id: req.params.totemid },
  });

  const favourite = await UserFavourites.create({
    UserId: user.id,
    TotemId: totem.id,
  });
  res.status(201).json(favourite);
});

//=============== delete favourite============ //
router.delete("/:userid/:totemid", async (req, res) => {
  const favourite = await UserFavourites.destroy({
    where: {
      UserId: req.params.userid,
      TotemId: req.params.totemid,
    },
  });
  res.status(201).json(favourite);
});

module.exports = router;
