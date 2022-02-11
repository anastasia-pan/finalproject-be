const router = require("express").Router();

//import model schema
const { Totem } = require("../models/totem");
const { User } = require("../models/user");
const { Sequelize } = require("sequelize");
const { findOrAddLocation } = require("./helpers.js");

//=====================get all totems ====================//

router.get("/", async (req, res) => {
  const totems = await Totem.findAll({});
  res.status(200).json(totems);
});

//=====================get all createdBy admin totems ====================//

router.get("/getalladmin", async (req, res) => {
  const user = await User.findOne({ where: { name: "admin" } });
  const totems = await Totem.findAll({ where: { UserId: user.id } });
  res.status(200).json(totems);
});

//============================ fetch one totem by id ==============================//
router.get("/:id", async (req, res) => {
  console.log(req);
  const totem = await Totem.findOne({ where: { id: req.params.id } });

  const location = await totem.getLocation();
  res
    .status(200)
    .json({ ...totem.get({ plain: true }), location: location.name });
});

//============================ fetch one admin totem by name ==============================//
router.get("/name/:name", async (req, res) => {
  try {
    const user = await User.findOne({ where: { name: "admin" } });
    const totem = await Totem.findOne({
      where: Sequelize.and({ UserId: user.id }, { name: req.params.name }),
    });
    if (totem === null) {
      res.status(404).json({ msg: "obj not found" });
    }
    const location = await totem.getLocation();
    res
      .status(200)
      .json({ ...totem.get({ plain: true }), location: location.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

//===================================== fetch all totems by date======================================//
router.get("/date/order", async (req, res) => {
  const adminuser = await User.findOne({
    where: { name: "admin" },
  });
  const totemsreturned = await Totem.findAll({
    where: { UserId: adminuser.id },
    order: [["date", "ASC"]],
  });
  console.log(JSON.stringify(totemsreturned, null, 2));
  res.status(200).json(totemsreturned);
});

//===================================== fetch all totems by date======================================//
router.get("/date/order/:userid", async (req, res) => {
  const adminuser = await User.findOne({
    where: { name: "admin" },
  });
  const totemsreturned = await Totem.findAll({
    where: { UserId: [adminuser.id, req.params.userid] },
    order: [["date", "ASC"]],
  });
  console.log(JSON.stringify(totemsreturned, null, 2));
  res.status(200).json(totemsreturned);
});
//===================================== fetch all totems by userID======================================//

router.get("/findbyuser/:id", async (req, res) => {
  const totemsreturned = await Totem.findAll({
    where: { UserId: parseInt(req.params.id) },
  });
  res.status(200).json(totemsreturned);
});

//===================================== make a totem =====================================//
router.post("/:userid", async (req, res) => {
  let returnedlocation = await findOrAddLocation(req.body.location);

  const totem = await Totem.create({
    name: req.body.name,
    date: req.body.date,
    UserId: parseInt(req.params.userid),
    LocationId: returnedlocation.id,
    description: req.body.description,
    image: req.body.image,
    illustration: req.body.illustration,
  });
  res.status(201).json(totem);
});

// =============================== delete one totem ==================================================
router.delete("/:id", async (req, res) => {
  const totem = await Totem.destroy({ where: { id: req.params.id } });

  res
    .status(200)
    .json({ msg: `${req.params.id} has been deleted from the database` });
});

//===================================== replace totem completely DONT USE IN REACT======================================//
//body sends entire object which replaces original user
router.put("/:id", async (req, res) => {
  const updatedTotem = await Totem.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(201).json({ msg: updatedTotem });
});

////===================================== update one  totem date by ID ======================================//

router.patch("/updatedate/:id", async (req, res) => {
  const updatedTotem = await Totem.update(
    { date: req.body.date },
    {
      where: { id: req.params.id },
    }
  );
  res.status(201).json(`${req.params.id} updated with ${req.body.date}`);
});

////===================================== get user via totem ======================================//

router.get("/getuser/:id", async (req, res) => {
  const totem = await Totem.findOne({ where: { id: req.params.id } });
  const user = await userFavourite.getUser();
  res.status(200).json(totem, user);
});

module.exports = router;
