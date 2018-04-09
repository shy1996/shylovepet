var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('./tool/mysql');
var mycode = require('./mycode');
/* GET users listing. */
//api接口
router.get('/api', function(req, res, next) {
	var userID = url.parse(req.url, true).query.userID;
	var queryObj = {
		userID: userID
	}
	mysql.connect((db) => {
		var showObj = {
			_id: 0
		}
		mysql.find(db, "customer", queryObj, showObj, (result) => {
			// console.log(result)
			res.send(result)
			db.close();
		})			
			
	})
});
//购物车接口
var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://localhost:27017/movies";
router.get('/addcart', function(req, res, next) {
	// console.log(req.body)
	mysql.connect(function(db) {
		//consoleconsole.log("success--------------------")
		var userID = url.parse(req.url, true).query.userID;
		var goodsID = url.parse(req.url, true).query.goodsID;
		var queryObj={
			userID : userID
		}
		var showObj = {}
		mysql.find(db, 'customer', queryObj, showObj, function(resultAll) {
			//console.log(goodsType,goodsType*1);
			console.log("---------resultAll-------",resultAll)
			var informItem = resultAll[0].information;
			console.log("---------informItem.goodsID-------",informItem[goodsID])
			if(informItem[goodsID]){
				var sum = informItem[goodsID]+1;
			}else{
				var sum = 1;
			}
			console.log("-----sum-----",sum)
			informItem[goodsID]=sum;
			console.log("---------informItem-------",informItem)
			var updateObj = {
				portrait: resultAll[0].portrait,
			    nickname: resultAll[0].nickname,
			    password:resultAll[0].password,
			    userID: resultAll[0].userID,
				information: informItem
			}
			var whereObj = {
				userID: userID
			}
			//db.customer.update(whereObj, updateObj,false);

			mysql.updateOne(db, 'customer', whereObj, updateObj,function(result) {			
				res.send("加入购物车成功")
				db.close()
			})
		})
	})
})
//客户分页
router.get('/', function(req, res, next) {
	var pageCode = url.parse(req.url, true).query.pageCode * 1;
	mysql.connect(function(db) {
		var queryObj = {};
		var showObj = {
			_id: 0,
			portrait: 1,
			nickname: 1,
			userID: 1,
			information: 1
		};
		var limitNum = 4;
		var skipNum = pageCode * limitNum;
		mysql.find(db, 'customer', queryObj, showObj, function(resultAll) {
			mysql.findFenye(db, 'customer', queryObj, showObj, limitNum, skipNum, pageCode, function(result) {
				var totalPages = Math.ceil(resultAll.length / limitNum); //总页数
				// console.log("----------------------"+totalPages+"++++++++++++++++++++")
				var obj = {
					title: "爱在小窝",
					allNum: resultAll.length, //总条数
					pageCode: pageCode, //当前页数
					totalPages: totalPages, //总页数
					result: result
				}
				res.render('customer', obj);
				//res.redirect("/list?goodsType="+goodsType+"&sortType="+sortType);
				db.close();
			})
		})
	})
	/**
	 * 进入电影列表，就向数据库请求数据
	 */
});
//删除客户数据方法
router.get('/deleteCustomer', function(req, res, next) {
	mysql.connect((db) => {
		// console.log("数据库连接成功")
		var fondID = url.parse(req.url, true).query.userID;
		var queryObj = {
			userID: fondID
		}
		mysql.deleteOne(db, "customer", queryObj, (result) => {
			res.redirect("/customer");
			db.close()
		})
	})
});

module.exports = router;