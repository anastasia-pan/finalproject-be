const router = require("express").Router();
const { Totem } = require("../models/totem");
const { User } = require("../models/user");
const { findOrAddLocation } = require("./helpers.js");

// ============================================ bulk find all ============================================///
router.get("/totem/:user", async (req, res) => {
  const allTotems = await Totem.findAll({
    where: { UserId: req.params.user },
  });
  res.status(200).json(allTotems);
});

// ============================================ bulk find ============================================///
router.get("/totem", async (req, res) => {
  const allTotems = await Totem.findAll({});
  res.status(200).json(allTotems);
});

// =================================================== bulk create ============================================///
router.post("/totem", async (req, res) => {
  const user = await User.findOne({ where: { name: "admin" } });
  if (Array.isArray(req.body)) {
    const objects = [];
    for (let i of req.body) {
      let location = await findOrAddLocation(req.body.location);
      objects.push(
        await Totem.create({ ...i, UserId: user.id, LocationId: location.id })
      );
    }
    res.status(201).json({ msg: "adminpostbulkcreatereached", objects });
  } else {
    let location = await findOrAddLocation(req.body.location);
    const object = await Totem.create({
      ...req.body,
      UserId: user.id,
      LocationId: location.id,
    });
    res.status(201).json({ msg: "adminpostbulkcreatereached", object });
  }
});

// =================================================== bulk destroy EVERYTHING ============================================///
router.delete("/", async (req, res) => {
  await User.truncate();
  await Totem.truncate();
  res.status(200).json({ msg: `They're all gone!` });
});

// =================================================== bulk destroy totems ============================================///
router.delete("/totem", async (req, res) => {
  await Totem.truncate();
  res.status(200).json({ msg: `They're all gone!` });
});

// =================================================== bulk destroy users ============================================///
router.delete("/users", async (req, res) => {
  await User.truncate();
  res.status(200).json({ msg: `They're all gone!` });
});

module.exports = router;
