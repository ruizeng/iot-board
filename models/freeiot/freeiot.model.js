!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null&&r.length>1) return (r[2]); return null;
  }

  if(GetQueryString('from')=='wechat' || GetQueryString('from')=='ide') {
    window.initFreeIOTWechat();
  } else {
    window.initFreeIOTJSBridge();
  }

  var model = {
    getStatusPending: false,
    getStatusQueue: [],
  };

  function resetModel (){
    model.getStatusPending = false;
    getStatusQueue = [];
  }

  function waitForGettingStatus(label, callback) {
    if (!model.getStatusPending) {
      model.getStatusPending = true;
      getStatusQueue.push({
        label: label,
        callback: callback
      });
      window.pando.getCurrentStatus(function(responseData) {
        if(responseData.code != 0) {
          alert(responseData.message);
          return resetModel();
        }
        var status = responseData.data;
        var q = model.getStatusQueue;
        for(var i=0; i<q.length; i++){
          q[i].callback(status[q[i].label]);
        }
        resetModel();
      });
    } else {
      getStatusQueue.push({
        label: label,
        callback: callback
      });
    }
  }

  /**
   * called when widget's status is changed.
   * @param  {String} widget [the widget name]
   * @param  {String} label  [the widget label to distinguish different widget of same type/name]
   * @param  {Object} status [the new status of widget]
   * @return {None}
   */
  model.onWidgetStatusChanged = function(widget, label, status){
    var data = {};
    data[label] = status;
    window.pando.setCurrentStatus(data, function(responseData) {
      console.log("responseData: " + responseData);
      if(responseData.code != 0) {
        alert(responseData.message);
      }
    });
  }

  /**
   * get widget current status 
   * @param  {String} widget [the widget name]
   * @param  {String} label  [the widget label to distinguish different widget of same type/name]
   * @param  {callback} callback [the result status will be passed through callback(status)]
   * @return {None}
   */
  model.getCurrentStatus = function(widget, label, callback) {
    waitForGettingStatus(labal.callback);
  }

  window.iotboard.setModel(model);
}();