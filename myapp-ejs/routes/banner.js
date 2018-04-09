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
    var bannerType=url.parse(req.url, true).query.bannerType*1;
    var bannerStr = "";
    console.log("-------------------"+bannerType+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
  switch (bannerType) {
    case 0:
    bannerStr="首页";
      break;
    case 1:
    bannerStr="其他"
      break;
  }
  console.log("----------str---------"+bannerStr+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
    var queryObj={
      bannerType:bannerType
    }
    var  showObj={
      _id:0,
      id:1,
      bannerType:1,
      bannerImg:1,
      bannerSrc:1
    }
    mysql.find(db, "banner", queryObj, showObj, (result)=>{
     // console.log("----------str---------"+bannerStr+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
       var obj ={
         title:"爱在小窝",
         bannerStr: bannerStr,
         bannerType: bannerType,
         result:result
       }
      res.render('banner', obj);
      db.close();
    })
  }) 
});
//api接口
router.get('/api', function(req, res, next) {
  mysql.connect((db)=>{
    //console.log("数据库连接成功")
    var bannerType=url.parse(req.url, true).query.bannerType*1;
    var queryObj={
      bannerType:bannerType
    }
    var  showObj={
      _id:0,
      id:1,
      bannerType:1,
      bannerImg:1,
      bannerSrc:1
    }
    mysql.find(db, "banner", queryObj, showObj, (result)=>{    
      res.send(result)
      db.close();
    })
  }) 
});
//addBanner路由
router.get('/AddBanner', function(req, res, next) {
  var bannerType=url.parse(req.url, true).query.bannerType*1;
  var obj ={
    title:"express",
    bannerType:bannerType
  }
  res.render('AddBanner', obj);
  db.close();
});
//添加电影方法
router.post('/AddBannerAction',upload.single("bannerImg"), function(req, res, next){
  console.log(req.file)
  var obj = req.body;
  console.log(obj)
  var filename = req.file.filename;
  var banneraddress= req.file.originalname;
  var insertData={
    id:obj.id,
    bannerType:obj.bannerType*1,
    bannerImg:"http://localhost:8000/"+banneraddress,
    bannerSrc:obj.bannerSrc
  }
  fs.rename("uploads/"+filename,"uploads/"+banneraddress,function(err,data){
    if(err)throw err;
   // console.log("-----------改名-----------------ok")
  })
  mysql.connect(function(db) {    
      mysql.insert(db, 'banner',insertData, function(result){
          res.send("<script>window.location.href='/Banner?bannerType=" +insertData.bannerType+ "'</script>")
          db.close()
      })
  })

})
module.exports = router;
//updateBanner路由
router.get('/updateBanner', function(req, res, next) {
  mysql.connect((db)=>{
   // console.log("数据库连接成功")
    var fondID=url.parse(req.url, true).query.id;
    var bannerType=url.parse(req.url, true).query.bannerType*1;
    console.log("---------------id-------------"+fondID)
    var queryObj={
      id:fondID
    }
    var  showObj={
      _id:0,
      id:1,
      bannerType:1,
      bannerImg:1,
      bannerSrc:1
    }
    mysql.find(db, "banner", queryObj, showObj, (result)=>{
     // console.log(result)
       var obj ={
         title:"爱在小窝",
         bannerType:bannerType,
         result:result
       }
      res.render('updateBanner', obj);
      db.close();
    })
  }) 
});
//更新电影数据方法
router.post('/updateBannerAction',upload.single("bannerImg"), function(req, res, next){
  console.log(req.body)
  mysql.connect(function(db) {
      var obj = req.body;
      var filename = req.file.filename;
      var banneraddress= req.file.originalname;
      var updateObj={
            id:obj.id,
            bannerType:obj.bannerType*1,
            bannerImg:"http://localhost:8000/"+banneraddress,
            bannerSrc:obj.bannerSrc
  }
  fs.rename("uploads/"+filename,"uploads/"+banneraddress,function(err,data){
    if(err)throw err;
   // console.log("-----------改名-----------------ok")
  })
      var whereObj ={id:updateObj.id}
      mysql.updateOne(db, 'banner',whereObj,updateObj, function(result){
        res.send("<script>window.location.href='/Banner?bannerType=" +updateObj.bannerType+ "'</script>")
          db.close()
      })
  })

})
//删除banner数据方法
router.get('/deleteBanner', function(req, res, next) {
  mysql.connect((db)=>{
    console.log("数据库连接成功")
    var fondID=url.parse(req.url, true).query.id;
    var bannerType=url.parse(req.url, true).query.bannerType*1;
    console.log(bannerType)
    var queryObj={
      id:fondID
    }
    mysql.deleteOne(db, "banner", queryObj,(result)=>{
      res.send("<script>window.location.href='/Banner?bannerType=" +bannerType+ "'</script>")
      db.close()
    })
  }) 
});
module.exports = router;