const router = require("express").Router();

//import model schema
const { Totem } = require("../models/totem");
const { Location } = require("../models/location");
const { Sequelize } = require("sequelize");

// const { findOrAddLocation } = require("./helpers.js");

//THE PATH TO ALL THESE ROUTES IS BASEURL/totem

const findOrAddLocation = async (locationparam) => {
  const existinglocations = await Location.findAll({
    where: { name: locationparam },
  });
  if (existinglocations.length === 1) {
    let returnedlocation = existinglocations[0];
    return returnedlocation;
  }
  let returnedlocation = await Location.create({
    name: locationparam,
  });
  return returnedlocation;
};

//=====================get all createdBy admin totems ====================//

router.get("/getall", async (req, res) => {
  const totems = await Totem.findAll({ where: { createdBy: "admin" } });
  res.status(200).json(totems);
});

//============================ fetch one totem by id ==============================//
router.get("/:id", async (req, res) => {
  console.log(req);
  const totem = await Totem.findOne({ where: { id: req.params.id } });
  res.status(200).json(totem);
});

//===================================== fetch all totems by date======================================//
router.get("/findbydate/:date", async (req, res) => {
  const totemsreturned = await Totem.findAll({
    where: { date: parseInt(req.params.date) },
  });
  console.log("111!!!!!");
  console.log(totemsreturned);
  res.status(200).json({ totemsreturned });
});

//===================================== fetch all totems by userID======================================//

router.get("/findbyuser/:id", async (req, res) => {
  const totemsreturned = await Totem.findAll({
    where: { createdBy: req.params.id },
  });
  res.status(200).json(totemsreturned);
});

//===================================== make a totem =====================================//
router.post("/:userid", async (req, res) => {
  let returnedlocation = await findOrAddLocation(req.body.location);

  const totem = await Totem.create({
    name: req.body.name,
    date: req.body.date,
    UserId: req.params.userid,
    LocationId: returnedlocation.id,
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

////===================================== update one  totem name by ID ======================================//

router.patch("/updatename/:id", async (req, res) => {
  const updatedTotem = await Totem.update(
    { name: req.body.name },
    {
      where: { id: req.params.id },
    }
  );
  res.status(201).json(`${req.params.id} updated with ${req.body.name}`);
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
