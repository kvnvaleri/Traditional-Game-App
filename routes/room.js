const express = require('express')
const router = express.Router()
const restrict = require("../middleware/restrictApi")
const room = require("../controllers/roomController")

router.post('/api/v1/create', restrict, room.create)

module.exports = router