import myajax from "@/tool/myajax.js";

let host = "http://localhost:8000"

export default {
  goodsList(cb){
    const config = {
      url: host + "/list/api",
      options:{},
      success:(data) => {
        cb(data)
      }
    }
    myajax.fetch(config);
  },
  //宠物列表接口
  getpetlist(typeindex,cb){
    const config = {
      url: host + "/petList/api?petListType=" + typeindex,
      options:{},
      success:(data) => {
        cb(data)
      }
    }
    myajax.fetch(config);
  },
   //宠物新闻列表接口
  getpetnews(cb){
    const config = {
      url: host + "/news/api",
      options:{},
      success:(data) => {
        cb(data)
      }
    }
    myajax.fetch(config);
  },
  //宠物列表详情接口
  getpetdetail(petID,cb){
  	const config = {
      url: host + "/petList/api"+petID,
      options:{},
      success:(data) => {
        cb(data)
      }
    }
    myajax.fetch(config);
  },
   //宠物新闻详情接口
  getnewsdetail(newID,cb){
  	const config = {
      url: host + "/news/api"+newID,
      options:{},
      success:(data) => {
        cb(data)
      }
    }
    myajax.fetch(config);
  },
}
