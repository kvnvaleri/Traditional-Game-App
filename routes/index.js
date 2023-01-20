var express = require('express');
var router = express.Router();

const index = require("../controllers/indexController")

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get("/", index.index)

module.exports = router;
