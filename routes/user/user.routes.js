const router = require("express").Router();
const { isLoggedIn } = require("../../config/authorization");
const { Dashboard } = require("../../controllers/user/user.controllers");
router.get("/dashboard", isLoggedIn, Dashboard);
module.exports = router;
