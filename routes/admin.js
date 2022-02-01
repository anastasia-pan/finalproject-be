const router = require("express").Router();



// to get all totems
router.get("/", (req, res) => {
   res.status(200).json({msg:"admingetallreached"})
})

// bulk create
router.post("/", (req, res) => {
   res.status(200).json({msg:"adminpostbulkcreatereached"})
})

// bulk destroy
router.delete("/", (req, res) => {
   res.status(200).json({msg:"adminpostbulkdestroy"})
})

module.exports = router;
