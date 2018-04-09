var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('./tool/mysql');
var mycode = require('./mycode.js');
/* GET users listing. */
router.get('/individual', function(req, res, next) {
  var obj={
    title:"爱在小窝登录"
  }
  res.render('individual',obj)
});
//退出处理
router.get('/logout', function(req, res, next) {
  res.clearCookie('isLogin');
  res.redirect("/")
});
//登录处理
router.post('/loginAction', function(req, res, next) {
  var obj = req.body;
  mysql.connect((db)=>{
  //   console.log("数据库连接成功")
     var queryObj=obj;
     var  showObj={
       _id:0
     }
     mysql.find(db, "user", queryObj, showObj, (result)=>{
       console.log(result)
        if(result.length>0){
            res.cookie("isLogin",1);
            res.redirect("/");
           //res.render('index',{title:"爱在小窝登录"});
            db.close();
        }else{
          res.render('login',{title:"爱在小窝登录",errInfo:"用户名或密码错误"});
          db.close();
        }            
     })
   }) 
});
//api接口
router.get('/api', function(req, res, next) {
	var userID = url.parse(req.url, true).query.userID;
	var password=url.parse(req.url, true).query.password
	var queryObj = {
		userID: userID
	}
	mysql.connect((db) => {
		var showObj = {
			_id: 0,
			password:1
		}
		mysql.find(db, "user", queryObj, showObj, (result) => {
			if(result[0].password == password){
				res.send("2")
			}else if(result[0].password == undefined){
				res.send("0")
			}else{
				res.send("1")	
			}
			db.close();
		})			
			
	})
});

//短信验证接口
var code = "";

function getRandomCode() {
	//产生随机数的方法体
	code = "1234";
	//Math.floor(Math.random()*9000)+1000;
	return code
}
router.get('/getCode', function(req, res, next) {
	/**
	 * 每一个手机号一天最多能发送5条短信
	 * 每一个IP地址一天最多能发送5条消息
	 * 在某一段时间内，发送短信的内容是一致的----短信验证码的有效时间
	 */
	// res.send('respond with a resource');
	var phonenum = url.parse(req.url, true).query.codevalue;
	console.log(phonenum);
	mycode.sendCode({
		PhoneNumbers: phonenum,
		code: getRandomCode(),
		success: function() {
			console.log(this.code);
			res.send(this.code) //发送成功
		}
	})
});

//注册接口方法
router.get('/register', function(req, res, next) {
        //console.log(req.body)
		var userID = url.parse(req.url, true).query.userID;
		var password=url.parse(req.url, true).query.password
        mysql.connect(function(db) {
			var insertData = {
				userID: userID,
				password:password
			}
            mysql.insert(db, 'user', insertData, function(result) {
				console.log(insertData);
				console.log(result);
				res.send(result);
                db.close()
            })
        })

    })

module.exports = router;
