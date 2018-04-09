import myajax from "@/tool/myajax.js";

let host = ""

export default {
	//宠物列表接口请求
  getpetlist(cb){
    const config = {
      url: host + "/json/petlist.json",
      options:{},
      success:(data) => {
        cb(data)
      }
    }
    myajax.fetch(config);
  },
}