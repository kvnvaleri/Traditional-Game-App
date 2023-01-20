const express = require('express');
const router = express.Router()

router.use(function timeLog (req, res, next){
    var now = Date.now()
    var date = now.toTimeString()
    console.log('Time :'+ date)
    next()
})

router.get("/index", function (req, res){
    res.send("This is index page")
})

router.get("/about", function(req, res){
    res.send("This is about page")
})

module.exports = router