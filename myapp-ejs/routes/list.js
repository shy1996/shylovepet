var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('./tool/mysql');
/* GET users listing. */
router.get('/', function(req, res, next) {
    mysql.connect((db) => {
        //console.log("数据库连接成功")
        var userType = url.parse(req.url, true).query.userType;
        var goodsStr = "";
      //  console.log("-------------------;;;;;;" + userType + ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        switch (userType) {
            case 1:
                goodsStr = "犬用";
                break;
            case 2:
                goodsStr = "猫用"
                break;
        }
        //console.log("----------str---------"+goodsStr+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        var queryObj = {
            userType: userType
        }
        var showObj = {
            _id: 0
        }
        mysql.find(db, "list", queryObj, showObj, (result) => {
            // console.log(result)
            var obj = {
                title: "爱在小窝",
                goodsStr: goodsStr,
                userType: userType,
                sortType: 0,
                result: result
            }
            res.render("list", obj);
            //res.send("<script>window.location.href='/list?userType="+userType+"&sortType="+sortType+"'</script>")
            //res.redirect("/list?userType="+userType+"&sortType="+sortType);
            db.close();
        })
    })
});
//api接口
router.get('/api', function(req, res, next) {
    var userType = url.parse(req.url, true).query.userType;
   	var item_id = url.parse(req.url, true).query.item_id;
   	if(item_id){
   		 var queryObj = {       
            item_id:item_id
        }
   	}else if(userType){
   		var queryObj = {
            userType:userType,
        }
   	}else{
   		var queryObj = {}
   	}
    mysql.connect((db) => {
        var showObj = {
            _id: 0
        }
        mysql.find(db, "list", queryObj, showObj, (result) => {
            // console.log(result)
            res.send(result)
            db.close();
        })
    })
});
//分页排序功能
router.get('/listSort', function(req, res, next) {
    // res.send('产品列表');
    var sortType = url.parse(req.url, true).query.sortType * 1;
    var userType = url.parse(req.url, true).query.userType;
    var pageCode = url.parse(req.url, true).query.pageCode * 1;
    var goodsStr = "";
    //console.log("-------------------;;;;;;"+userType+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
    switch (userType) {
        case 1:
            goodsStr = "犬用";
            break;
        case 2:
            goodsStr = "猫用"
            break;
    }
    mysql.connect(function(db) {
            // console.log("-------------------success-sortlist----------------------");
            var queryObj = {
                userType: userType
            };
            var showObj = {
                _id: 0
            };
            var limitNum = 4;
            var skipNum = pageCode * limitNum;
            var sortObj = {
                price: sortType
            }
            mysql.find(db, 'list', queryObj, showObj, function(resultAll) {
                mysql.findFenyeSort(db, 'list', queryObj, showObj, limitNum, skipNum, pageCode, sortObj, function(result) {
                    var totalPages = Math.ceil(resultAll.length / limitNum); //总页数
                    // console.log("----------------------"+totalPages+"++++++++++++++++++++")
                    var obj = {
                        title: "爱在小窝",
                        goodsStr: goodsStr,
                        userType: userType,
                        sortType: sortType,
                        allNum: resultAll.length, //总条数
                        pageCode: pageCode, //当前页数
                        totalPages: totalPages, //总页数
                        result: result
                    }
                    res.render('list', obj);
                  // res.send(result)
                    //res.redirect("/list?userType="+userType+"&sortType="+sortType);
                    db.close();
                })
            })
        })
        /**
         * 进入电影列表，就向数据库请求数据
         */
});
//addGoods路由
router.get('/AddGoods', function(req, res, next) {
    var userType = url.parse(req.url, true).query.userType;
    var sortType = url.parse(req.url, true).query.sortType * 1;
    var obj = {
        title: "爱在小窝",
        userType: userType,
        sortType: sortType
    }
    res.render('AddGoods', obj);
    db.close();
});
//添加电影方法
router.post('/addGoodsAction', function(req, res, next) {
        //console.log(req.body)
        mysql.connect(function(db) {
            //console.log("success---------------")
            var obj = req.body;
            var insertData = obj;
            var userType = insertData.userType;
            //console.log(insertData,userType);
            mysql.insert(db, 'list', insertData, function(result) {
                res.redirect("/list/listSort?userType=" + userType + "&sortType=1&limitNum=4&pageCode=0");
                //res.send("<script>window.location.href='/list?userType='"+userType+"</script>")
                db.close()
            })
        })

    })
    //updateGoods路由
router.get('/updateGoods', function(req, res, next) {
    mysql.connect((db) => {
        //console.log("数据库连接成功")
        var fondID = url.parse(req.url, true).query.item_id;
        //console.log("--------------------fondID------------------------"+fondID)
        var userType = url.parse(req.url, true).query.userType;
        var sortType = url.parse(req.url, true).query.sortType * 1;
        var queryObj = {
            item_id: fondID
        }
        var showObj = {
            _id: 0
        }
        mysql.find(db, "list", queryObj, showObj, (result) => {
            // console.log(result)
            var obj = {
                title: "爱在小窝",
                userType: userType,
                sortType: sortType,
                result: result
            }
            res.render('updateGoods', obj);
            db.close();
        })
    })
});
//更新电影数据方法
router.post('/updateGoodsAction', function(req, res, next) {
        // console.log(req.body)
        mysql.connect(function(db) {
            //consoleconsole.log("success--------------------")
            var obj = req.body;
            var updateObj =obj; 
            var whereObj = { item_id: updateObj.item_id }
            var userType = updateObj. userType;
            //console.log(userType,userType*1);
            mysql.updateOne(db, 'list', whereObj, updateObj, function(result) {
                res.redirect("/list/listSort?userType=" + userType + "&sortType=1&limitNum=4&pageCode=0");
                // res.send("<script>window.location.href='/list?userType=1'</script>")
                db.close()
            })
        })

    })
    //删除电影数据方法
router.get('/deleteGoods', function(req, res, next) {
    mysql.connect((db) => {
        // console.log("数据库连接成功")
        var fondID = url.parse(req.url, true).query.item_id;
        var userType = url.parse(req.url, true).query.userType;
        var queryObj = {
            item_id: fondID
        }
        mysql.deleteOne(db, "list", queryObj, (result) => {
            res.redirect("/list/listSort?userType=" + userType + "&sortType=1&limitNum=4&pageCode=0");
            db.close()
        })
    })
});
module.exports = router;