var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.isLogin==1){
    res.render('index', {title:"爱在小窝"});
  }else{
    res.render('login', {title:"爱在小窝",errInfo:""});
  }
  
});
module.exports = router;
