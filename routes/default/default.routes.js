const { getHome } = require("../../controllers/default/default.controller");

const router = require("express").Router();

router.get("/", getHome);
router.get("/market", (req, res) => {
  res.render("markets");
});

module.exports = router;
