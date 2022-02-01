const router = require("express").Router();

const { User } = require("../models/user");

//=========create a user without verification, authentication (to be amended)==================//

router.post("/", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    passwordHash: req.body.password,
  });
  res
    .status(201)
    .json({ msg: `${req.body.name} has been added to the database` });
});

module.exports = router;
