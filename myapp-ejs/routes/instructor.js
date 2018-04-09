var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('./tool/mysql');
var mycode = require('./mycode');
/* GET users listing. */
//api接口
router.get('/api', function(req, res, next) {
	var txtID = url.parse(req.url, true).query.txtID;
	if(txtID){
		var queryObj = {
			txtID: txtID
		}
	}else{
		var queryObj = {}
	}	
	mysql.connect((db) => {
		var showObj = {
			_id: 0
		}
		mysql.find(db, "instructor", queryObj, showObj, (result) => {
			res.send(result)
			db.close();
		})
	})
});
//分页
router.get('/', function(req, res, next) {
	var pageCode = url.parse(req.url, true).query.pageCode * 1;
	mysql.connect(function(db) {
		var queryObj = {};
		var showObj = {
			_id: 0
		};
		var limitNum = 4;
		var skipNum = pageCode * limitNum;
		mysql.find(db, 'instructor', queryObj, showObj, function(resultAll) {
			mysql.findFenye(db, 'instructor', queryObj, showObj, limitNum, skipNum, pageCode, function(result) {
				var totalPages = Math.ceil(resultAll.length / limitNum); //总页数
				// console.log("----------------------"+totalPages+"++++++++++++++++++++")
				var obj = {
					title: "爱在小窝",
					allNum: resultAll.length, //总条数
					pageCode: pageCode, //当前页数
					totalPages: totalPages, //总页数
					result: result
				}
				res.render('instructor', obj);
				db.close();
			})
		})
	})
});
//发布文章路由
router.get('/addInstructor', function(req, res, next) {
    var obj = {
        title: "爱在小窝",
    }
	res.render('addInstructor', obj);
});
//发布文章方法
router.post('/addInstructorAction', function(req, res, next) {
	mysql.connect(function(db) {
		console.log("success---------------")
		var obj = req.body;
		var insertData = {
			title: obj.title,
			type: obj.type * 1,
			props:obj.props,
			author:obj.author,
			time:obj.time,
			txtID: obj.txtID,						
			text:obj.text
		}
		var goodsType = insertData.type;
		mysql.insert(db, 'instructor', insertData, function(result) {
			res.redirect("/instructor");	
			db.close()
		})
	})

})

//删除数据方法
router.get('/deleteInstructor', function(req, res, next) {
	mysql.connect((db) => {
		// console.log("数据库连接成功")
		var txtID = url.parse(req.url, true).query.txtID;
		var queryObj = {
			txtID: txtID
		}
		mysql.deleteOne(db, "instructor", queryObj, (result) => {
			res.redirect("/instructor");
			db.close()
		})
	})
});
module.exports = router;