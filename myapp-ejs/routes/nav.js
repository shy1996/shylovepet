var express = require('express');
var router = express.Router();
var url = require('url');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var mysql = require('./tool/mysql');
var fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res, next) {
  mysql.connect((db)=>{
    //console.log("数据库连接成功")
    var navType=url.parse(req.url, true).query.navType;
    var navStr = "";
  switch (navType) {
    case 0:
    navStr="首页";
      break;
    case 1:
    navStr="其他"
      break;
  }
    var queryObj={
      navType:navType,
    }
    var  showObj={
      _id:0,
    }
    mysql.find(db, "nav", queryObj, showObj, (result)=>{
     // console.log("----------str---------"+navStr+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
       var obj ={
         title:"爱在小窝",
         navStr: navStr,
         navType: navType,
         result:result
       }
      res.render('nav', obj);
      db.close();
    })
  }) 
});
//api接口
router.get('/api', function(req, res, next) {
  mysql.connect((db)=>{
    //console.log("数据库连接成功")
    var navType=url.parse(req.url, true).query.navType*1;
    if(navType){
      var queryObj={
        navType:navType,
      }
    }else{
      var queryObj = {}
    }
    var  showObj={
      _id:0,
    }
    mysql.find(db, "nav", queryObj, showObj, (result)=>{
     		res.send(result)
        db.close();
    })
  }) 
});
//addnav路由
router.get('/AddNav', function(req, res, next) {
  var navType=url.parse(req.url, true).query.navType*1;
  var obj ={
    title:"爱在小窝",
    navType:navType
  }
  res.render('AddNav', obj);
  db.close();
});
//添加nav方法
router.post('/AddNavAction',upload.single("navImg"), function(req, res, next){
  //console.log(req.file)
  var obj = req.body;
 // console.log(obj)
  var insertData={
    id:obj.id,
    navType:obj.navType*1,
    navImg:obj.navImg,
    navSrc:obj.navSrc
  }
  mysql.connect(function(db) {    
      mysql.insert(db, 'nav',insertData, function(result){
          res.send("<script>window.location.href='/nav?navType=" +insertData.navType+ "'</script>")
          db.close()
      })
  })

})
module.exports = router;
//updatenav路由
router.get('/updateNav', function(req, res, next) {
  mysql.connect((db)=>{
   // console.log("数据库连接成功")
    var fondID=url.parse(req.url, true).query.id;
    var navType=url.parse(req.url, true).query.navType*1;
   // console.log("---------------id-------------"+fondID)
    var queryObj={
      id:fondID
    }
    var  showObj={
      _id:0,
      id:1,
      navType:1,
      navImg:1,
      navSrc:1
    }
    mysql.find(db, "nav", queryObj, showObj, (result)=>{
     // console.log(result)
       var obj ={
         title:"爱在小窝",
         navType:navType,
         result:result
       }
      res.render('updateNav', obj);
      db.close();
    })
  }) 
});
//更新nav数据方法
router.post('/updateNavAction',upload.single("navImg"), function(req, res, next){
  console.log(req.body)
  mysql.connect(function(db) {
      var obj = req.body;
      var updateObj={
            id:obj.id,
            navType:obj.navType*1,
            navImg:obj.navImg,
            navSrc:obj.navSrc
  }
      var whereObj ={id:updateObj.id}
      mysql.updateOne(db,'nav',whereObj,updateObj, function(result){
        res.send("<script>window.location.href='/nav?navType=" +updateObj.navType+ "'</script>")
          db.close()
      })
  })

})
//删除nav数据方法
router.get('/deleteNav', function(req, res, next) {
  mysql.connect((db)=>{
    //console.log("数据库连接成功")
    var fondID=url.parse(req.url, true).query.id;
    var navType=url.parse(req.url, true).query.navType*1;
    //console.log(navType)
    var queryObj={
      id:fondID
    }
    mysql.deleteOne(db, "nav", queryObj,(result)=>{
      res.send("<script>window.location.href='/nav?navType=" +navType+ "'</script>")
      db.close()
    })
  }) 
});
module.exports = router;
