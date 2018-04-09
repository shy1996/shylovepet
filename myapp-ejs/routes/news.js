var express = require('express');
var router = express.Router();
var url = require('url');
var multer = require("multer");
var uploads = multer({dest:"uploads/"});
var fs = require("fs");

var mysql = require("./tool/mysql")

/* GET users listing. */
//var isLogin = 0;
router.get('/', function(req, res, next) {
    // if(req.cookies.isLogin == 1) {
        var pageCode = url.parse(req.url, true).query.pageCode * 1;
        var limitNum = url.parse(req.url, true).query.limitNum * 1;
        mysql.connect(function(db){
            var queryObj = {};
            var showObj = {
                _id: 0,
            };
            var skipNum = limitNum * (pageCode  - 1);

            //先查找出所有的数据
            mysql.find(db, "news", queryObj, showObj, (resultAll) => {
                //console.log(result);
                var obj = {
                    title: "爱在小窝",               
                    result:resultAll,
                };
                //从所有数据中进行分页
                mysql.findFenye(db, "news", queryObj, showObj, limitNum, skipNum, pageCode, (result) => {
                    var totalPages = Math.ceil(resultAll.length / limitNum);//总页数
                    var obj = {
                        title: "爱在小窝",
                        result: result,
                        allNum: resultAll.length,
                        pageCode: pageCode,
                        totalPages: totalPages
                    };
                    res.render("news", obj);
                    db.close();
                });
            });
        });
     //}else{
    //     res.render("login", {title:"登录",errInfo:""});
    // }

});
//api
router.get('/api', function(req, res, next){
    var pageCode = url.parse(req.url, true).query.pageCode * 1;
    var limitNum = url.parse(req.url, true).query.limitNum * 1;
    var newID = url.parse(req.url, true).query.newID;
    var showObj = {
        _id: 0,
    };
      mysql.connect(function(db){
        if(newID){
            var queryObj = {newID:newID};
            mysql.find(db, "news", queryObj, showObj, (result) => {           
                res.send(result);
                db.close();
            });
        }else{
            var queryObj = {};
            var skipNum = limitNum * (pageCode  - 1);
          mysql.findFenye(db, "news", queryObj, showObj, limitNum, skipNum, pageCode, (result) => {
                res.send(result);
                db.close();
        });
        }   
   });
});
//进入更新新闻信息页面
router.get('/updateNew', function(req, res, next){
    var newID = url.parse(req.url, true).query.newID;
    var pageCode = url.parse(req.url, true).query.pageCode;
    var obj = {
        title: "爱在小窝",
        activeIndex: 4,
        isBoss: false,
        newID: newID,
        pageCode:pageCode
    };

    //依据ID查询本商品
    mysql.connect(function(db){
        var queryObj = {newID: newID};
        var showObj = {
            _id: 0
        };

        mysql.find(db, 'news', queryObj, showObj, function(result) {
            var obj = {
                title: "爱在小窝",
                activeIndex: 4,
                isBoss: false,
                result: result,
                pageCode:pageCode
            };
            res.render('updateNews', obj);
            db.close();
        });
    });

});

//更新新闻数据成功
router.post('/updateNewAction', uploads.single('newUrl'),function (req, res, next) {
    var obj = req.body;
    var filename = req.file.filename;
    var originalname = req.file.originalname;
    var pageCode = url.parse(req.url, true).query.pageCode;

    fs.rename("uploads/"+filename, "uploads/"+originalname, (err) => {
        if(err) throw err;
        mysql.connect((db) => {
            var updateObj = {
                newID: obj.newID,
                newUrl: "http://localhost:8000/"+originalname,
                newTitle:obj.newTitle,
                author:obj.author,
                time:obj.time,
                editor:obj.editor
            };
            var whereObj = {newID:obj.newID};

            mysql.updateOne(db, "news", whereObj, updateObj, (result) =>{
                res.redirect("/news?limitNum=4&pageCode="+pageCode);
                db.close();
            }) ;
        });
    });

});

//更新数据返回
router.get("/backNews", (req,res,next) => {
   var pageCode = url.parse(req.url, true).query.pageCode;
   res.redirect("/news?limitNum=4&pageCode="+pageCode);
});

//删除新闻
router.get('/deleteNew', function (req, res, next) {
    var newID = url.parse(req.url, true).query.newID;

   mysql.connect((db)=>{
       var deleteObj = {
           newID: newID
       }

       mysql.deleteOne(db, "news", deleteObj, (result) =>{
          res.redirect("/news");
           db.close();
       });

   }) ;
});

 //跳转致添加新的商品页面
router.get('/addNews', function (req, res, next) {
    var pageCode = url.parse(req.url, true).query.pageCode;
    var obj = {
        title: "爱在小窝",
        activeIndex: 4,
        isBoss: false,
        pageCode:pageCode
    };
    res.render("addNews", obj);
});

//添加新闻信息保存数据
router.post('/addNewAction', uploads.single('newUrl'), function (req, res, next) {
       var obj = req.body;
       var filename = req.file.filename;
       var originalname = req.file.originalname;
       var pageCode = url.parse(req.url, true).query.pageCode;
       fs.rename("uploads/"+filename, "uploads/"+originalname, (err) => {
           if (err) throw err;
           mysql.connect((db) =>{
               var insertData ={
                   newID: obj.newID,
                   newUrl: "http://localhost:8000/"+originalname,
                   newTitle:obj.newTitle,
                   author:obj.author,
                   time:obj.time,
                   editor:obj.editor
               };
               mysql.insert(db, "news", insertData, (result) => {
                   res.redirect("/news?limitNum=4&pageCode="+pageCode);
                   db.close();
               });
           }) ;
       });

});


module.exports = router;
