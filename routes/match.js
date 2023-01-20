const express = require("express")
const router = express.Router()
const match = require("../controllers/matchController")
const restriction = require("../middleware/restrictApi")

router.post("/api/v1/:room_id", restriction, match.fight)

module.exports = router