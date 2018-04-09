import fetchJsonp from 'fetch-jsonp'
import qs from 'qs'

export default ({url,data,method,success,jsonp,headers}) => {
  let send = jsonp ? fetchJsonp : fetch ;
  let body = null;
  if(method === "post"){
    body = new FormData();
    for(var item in data){
      body.append(item,data[item])
    }
  }else{
    method = "get";
    data = qs.stringify(data);
    url += "?" + data;
  }
  
  send(url, { method, data, body , headers})
    .then( res => res.json() )
    .then( data => success(data) )
    .catch( err => console.log(err) )

}
