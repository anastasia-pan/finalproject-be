const router = require("express").Router();

//=========landing message route==================//

router.get("/", async (req, res) => {
  res.json({ msg: `Hello World` });
});

module.exports = router;
