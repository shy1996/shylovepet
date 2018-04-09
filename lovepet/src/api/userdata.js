import myajax from "@/tool/myajax.js";

let host = "http://localhost:8000"

export default {
    login(cb,params){
	    const config = {
	      url: host + "/users/api",
	      options:{
	        body:{
	          phone: params.phone,
	          password: params.password
	        }
	      },
	      success:(data) => {
	        cb(data)
	      }
	    }
	    myajax.fetch3(config);
	  },
	  register(cb,params){
	    const config = {
	      url: host + "/users/register",
	      options:{
	        body:{
	          phone: params.phone,
	          password: params.password
	        }
	      },
	      success:(data) => {
	        cb(data)
	      }
	    }
	    myajax.fetch2(config);
	  },
	  sendCode(cb,params){
	  	const config = {
	      url: host + "/users/getCode",
	      options:{
	        body:{
	          codevalue :params.codevalue 
	        }
	      },
	      success:(data) => {
	        cb(data)
	      }
	    }
	}
}