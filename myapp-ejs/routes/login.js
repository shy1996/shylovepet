var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var obj ={
    title:"爱在小窝",
  }
  res.render('login', obj);
});
module.exports = router;
