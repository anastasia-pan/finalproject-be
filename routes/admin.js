const router = require("express").Router();

//========================admin bulk destroy==================//

router.delete("/", async (req, res) => {
  const totem = await Totem.bulkDestroy({
    where: { location: "" },
  });
  res.status(200).json({ user });
});

module.exports = router;
