window.initFreeIOTWechat = function(){
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null&&r.length>1) return (r[2]); return null;
  }
  var identifier = getQueryString('identifier');

  var getCurrentStatus = function(responseCallback) {
    $.ajax({
      url:'http://freeiot.pandocloud.com/api/device/status/current?identifier='+iotboard.identifier,
      crossDomain:true,
      type:'get',
      success:function(r){
        console.log(r);
        if(r.code!=0){
          alert(r.msg);
        }
        responseCallback(r);
      }
    });
  };
  var setCurrentStatus = function(data,responseCallback) {
    $.ajax({
      type:'post',
      url:'http://freeiot.pandocloud.com/api/device/status/current?identifier='+iotboard.identifier,
      crossDomain:true,
      data:JSON.stringify(data),
      contentType:'application/json',
      success:function(r){
        console.log(r);
        if(r.code!=0){
          alert(r.msg);
        }
        responseCallback();
      }
    });
  };

  window.pando = {};
  window.pando.getCurrentStatus = function(responseCallback) {
        getCurrentStatus(responseCallback);
  };
  window.pando.setCurrentStatus = function(responseCallback) {
        setCurrentStatus(data, responseCallback);
  };

}