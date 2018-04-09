//时钟
function foo(){
    //		var imgs=[box1,box2,box3,box4,box5,box6];
              var aImg=$(".clock>img");		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         			var oDate=new Date;
              var hour=oDate.getHours();
              var day=oDate.getDay();
              var date=oDate.getDate();
              var month=oDate.getMonth()+1;
              var year=oDate.getFullYear();
              var minute=oDate.getMinutes();
              var second=oDate.getSeconds();
              switch (day) {
                case 0:
                  day="日";
                case 1:
                  day="一";
                case 2:
                  day="二";
                case 3:
                  day="三";
                case 4:
                  day="四";
                case 5:
                  day="五";
                case 6:
                  day="六";
                  break;                             
              }
              $(".year").html(year);
              $(".month").html(month);
              $(".date").html(date);
              $(".day").html("星期"+day);
              hour=tim(hour);
              minute=tim(minute);
              second=tim(second);
            function tim(times){
              return times<10?"0"+times:times;
            }
            var str=""+hour+minute+second;
            for(var i=0; i<str.length;i++){
              aImg[i].src="/images/"+str[i]+".png";
            }
          }
          foo();
          setInterval(foo,1000);	
//天气接口
$.ajax({
    type: "POST",
    headers: {
        'Authorization':'APPCODE 4bee90cd72da43a0b630f48b235fed8b'
    },
    url: "http://apifreelat.market.alicloudapi.com/whapi/json/aliweather/briefforecast3days",
    data: {
        lat : '34.73',
        lon : '113.65',
        token : '443847fa1ffd4e69d929807d42c2db1b'
    },
    success: function(data) {
        var data= JSON.parse(data).data;
        console.log(data)
        var city=data.city.name;
        var conditionDay=data.forecast[0].conditionDay;//晴
        var tempNight=data.forecast[0].tempNight;//最低气温
        var tempDay=data.forecast[0].tempDay;//最高气温
        var temp=tempNight+"到"+tempDay+"度";
        var updatetime=data.forecast[0].updatetime;//更新时间
        var img=document.getElementById("img")
        if(conditionDay=="晴"){
            img.src="/images/qt.jpg";
        }else if(conditionDay=="多云"){
            img.src="/images/dy.jpg";
        }else if(conditionDay=="雨"){
            img.src="/images/yv.jpg";
        }else if(conditionDay=="雪"){
            img.src="/images/dx.jpg";
        }else if(conditionDay=="闪电"){
            img.src="/images/sd.jpg";
        }else{         
            img.src="/images/qzy.jpg";
        }                       
        $(".tainqi>span").html(temp)
        $(".address").html(city)
        $(".time").html("更新时间"+updatetime)
       // console.log(temp)
    }
})