var express = require('express');
var router = express.Router();
var mysql = require("./tool/mysql");
var url = require("url");
var multer = require("multer");
var uploads = multer({dest:"uploads/"});
var fs = require("fs");
var getpetType = function(petListType,petListStr){
    switch (petListType){
        case 0:
            petListStr = "牧羊犬";
            break;
        case 1:
            petListStr = "金毛";
            break;
        case 2:
            petListStr = "哈士奇";
            break;
        case 3:
            petListStr = "拉布拉多犬";
            break;
        case 4:
            petListStr = "吉娃娃";
            break;
        case 5:
            petListStr = "博美";
            break;
        case 6:
            petListStr = "松狮";
            break;
        case 7:
            petListStr = "斗牛梗";
            break;
        case 8:
            petListStr = "阿拉斯加";
            break;
        case 9:
            petListStr = "泰迪";
            break;
        case 10:
            petListStr = "其他犬种";
            break;
        case 11:
            petListStr = "苏格兰摺耳猫";
            break;
        case 12:
            petListStr = "日本短尾猫";
            break;
        case 13:
            petListStr = "英国短毛猫";
            break;
        case 14:
            petListStr = "美国短毛猫";
            break;
        case 15:
            petListStr = "波斯猫";
            break;
        case 16:
            petListStr = "卷毛猫";
            break;
        case 17:
            petListStr = "布偶猫";
            break;
        case 18:
            petListStr = "加菲猫";
            break;
        case 19:
            petListStr = "缅甸猫";
            break;
        case 20:
            petListStr = "暹罗猫";
            break;
        case 21:
            petListStr = "其他猫种";
            break;
      }
      return petListStr;
    }
/* GET home page. */
var isLogin = 0;
router.get('/', function(req, res, next) {
    if(req.cookies.isLogin == 1) {
        var petListType = url.parse(req.url, true).query.petListType *1;
        var petListStr = "";  
       petListStr = getpetType(petListType,petListStr);  
        console.log(petListType)
        mysql.connect((db) => {
            var queryObj  ={petListType:petListType+""};
            var showObj = {
                _id:0
            };
            mysql.find(db, "petList", queryObj, showObj, (result) => {
                console.log(result)
                res.render("petList",{title: "爱在小窝宠物列表",result:result,petListType:petListType, petListStr:petListStr});
                db.close();
            });
        });
    }else{
        res.render("login", {title:"登录",errInfo:""});
    }

});
//------------------api------------
router.get('/api', function(req, res, next) {    
        var petListType = url.parse(req.url, true).query.petListType;
        var petID = url.parse(req.url, true).query.petID;
        if(petID){
            var queryObj = {petID:petID}
        }else{
            var queryObj = {petListType:petListType}
        }
        mysql.connect((db) => {
            var showObj = {
                _id:0
            };
            mysql.find(db, "petList", queryObj, showObj, (result) => {
               // console.log(result)
                res.send(result);
                db.close();
            });
        });

});

//添加宠物按钮事件
router.get("/addPet", function (req, res, next) {
    var petListType = url.parse(req.url, true).query.petListType*1;
    var  petListStr= "";
    var str="";
    if(petListType>10){
        str="cat"
    }else{
        str="dog"
    }
    petListStr = getpetType(petListType,petListStr); 
    var petID = str+(Math.floor(Math.random()*90000)+10000);
    //console.log(req.url,bannerType);
   res.render("addPet", {title: "爱在小窝",petListStr:petListStr, petID:petID, petListType:petListType,tip:""}) ;
});

//点击添加里保存宠物按钮事件
router.post("/addPetAction",uploads.single('imgUrl'), (req, res, next) => {
    var obj = req.body;
    var petListType = obj.petListType;
    var petListStr = "";
    petListStr = getpetType(petListType,petListStr); 
    var filename = req.file.filename;
    var originalname = req.file.originalname;
    //console.log(filename,originalname);
    fs.rename("uploads/"+filename, "uploads/"+originalname, (err) => {
        if(err) throw err;
        mysql.connect((db) => {
            //查询数据库是否存在此id
            var insertData = {
                petListType: petListType,
                petID: obj.petID,
                imgUrl: "http://localhost:8000/"+originalname,
                owner:obj.owner,
                phone:obj.phone,
                age:obj.age,
                sex:obj.sex,
                area:obj.area,
                status:obj.status,
                editor:obj.editor
            };
            var queryObj = {petID:obj.petID,petListType:obj.petListType};
            var showObj = {};
            mysql.find(db,"petList", queryObj, showObj, (result) => {
                if(result.length == 0){
                    mysql.insert(db, "petList", insertData, (result) => {
                        //console.log(result);
                        //重定向，后面是链接的路由地址，接收传参等操作
                        res.redirect("/petList?petListType="+obj.petListType);
                        db.close();
                    });
                }else{
                    res.render('addPet', {title: "爱在小窝",petListStr:petListStr, petListType:obj.petListType, tip:"该宠物id已经存在、已添加"})
                }

            });

        });
    });

 });

//删除宠物
router.get("/deletePet", (req, res, next) => {
    var petID = url.parse(req.url, true).query.petID;
    var petListType = url.parse(req.url, true).query.petListType*1;
    mysql.connect((db) => {
        var deleteObj = {
            petID: petID
        };
        mysql.deleteOne(db, "petList", deleteObj, (result) => {
            res.redirect("/petList?petListType="+petListType);
            db.close();

       }) ;
    });
});

//编辑更新宠物按钮事件
router.get("/updatePet", (req, res, next) => {
    var petListType = url.parse(req.url, true).query.petListType*1;
    var petID =url.parse(req.url, true).query.petID;
    var petListStr = "";
    petListStr = getpetType(petListType,petListStr); 
    console.log("-------------------------",petListStr)
    mysql.connect((db) => {
        var queryObj = {petID:petID};
        var showObj = {
            _id: 0
        };
       mysql.find(db, "petList", queryObj, showObj, (result) => {
           res.render("updatePet",{title: "更新列表",petListStr:petListStr, petListType:petListType,petID:petID, result:result});
       }) ;
    });
});

//更新宠物点击保存按钮事件
router.post("/updatePetAction",uploads.single('imgUrl'), (req, res, next) => {
    var obj =req.body;
    var petListStr = "";
    var petListType = obj.petListType;
    petListStr = getpetType(petListType,petListStr); 
    var filename = req.file.filename;
    var originalname = req.file.originalname;

    fs.rename("uploads/"+filename, "uploads/"+originalname, (err) => {
        if(err) throw err;
        mysql.connect((db) => {
            var updateObj = {
                petListType: petListType,
                petID: obj.petID,
                imgUrl: "http://localhost:8000/"+originalname,
                owner:obj.owner,
                phone:obj.phone,
                age:obj.age,
                sex:obj.sex,
                area:obj.area,
                status:obj.status,
                editor:obj.editor
            };
            var whereObj = {petID:updateObj.petID};

            mysql.updateOne(db, "petList", whereObj, updateObj, (result) =>{
                res.redirect("/petList?petListType="+obj.petListType);
                db.close();
            }) ;
        });
    });

 });

module.exports = router;
