const express = require('express')
const router = express.Router()
const auth = require("../controllers/authController")
const restrict = require("../middleware/restrictApi")

router.get("/login", auth.login)
router.get("/register", auth.register)
router.post("/login", auth.doLogin)
router.post("/registration", auth.registration);

router.post("/api/v1/login", auth.restLogin);
router.get("/api/v1/whoami", restrict, auth.whoami);
router.post("/api/v1/register", auth.restRegister);

module.exports = router