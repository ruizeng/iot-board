!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var model = {};

  /**
   * called when widget's status is changed.
   * @param  {String} widget [the widget name]
   * @param  {String} label  [the widget label to distinguish different widget of same type/name]
   * @param  {Object} status [the new status of widget]
   * @return {None}
   */
  model.onWidgetStatusChanged = function(widget, label, status){
    switch(widget){
      case "text":
        console.log(status.text);
        break;
      case "switch":
        (function(){
          console.log("switch status changed:" + label);
          console.log(JSON.stringify(status));
          var data = {};
          data[label] = status.on?[1]:[0];
          window.pando.sendCommand(data, function(responseData) {
             console.log("sendCommand callback....");
             console.log("responseData: " + responseData);
          });
        }());
        break;
      case "led":
        (function(){
          console.log("led status changed:" + label);
          console.log(JSON.stringify(status));
          var data = {};
          data['set'] = [status['freq'],
            status['red'],
            status['green'],
            status['blue'],
            status['white']];
          window.pando.sendCommand(data, function(responseData) {
            console.log("sendCommand callback....");
            console.log("responseData: " + JSON.stringify(responseData));
          });
        })();
        break;
      default:
        console.log("widget {" + widget + "}" + " handler not found!");
        break;
    }
  }

  /**
   * get widget current status 
   * @param  {String} widget [the widget name]
   * @param  {String} label  [the widget label to distinguish different widget of same type/name]
   * @param  {callback} callback [the result status will be passed through callback(status)]
   * @return {None}
   */
  model.getCurrentStatus = function(widget, label, callback) {
    switch(widget){
      case "text":
        callback({
          text: "status changed:" + (new Date())
        })
        break;
      case "switch":
        console.log(label);
        (function(){
          window.pando.getDeviceStatus(function(responseData) {
            var data = responseData.data;
            callback({
              on: (data[label][0] == 0)?false:true
            });
          });
        })();
        break;
      case "led":
        (function(){
          window.pando.getDeviceStatus(function(responseData) {
            var status = responseData.data[label];
            callback({
              red: status[1],
              green: status[2],
              blue: status[3],
              freq: status[0],
              white: status[4],
            });
          });
        })();
        break;
      case "atmosphere":
        (function(){
          window.pando.getDeviceStatus(function(responseData) {
            var status = responseData.data[label];
            callback({
              temperature: status[0].toFixed(1),
              humidity: status[1].toFixed(1),
              pm25: status[2].toFixed(1)
            });
          });
        })();
        break;
      default:
        console.log("widget {" + widget + "}" + " handler not found!");
        break;
    }
  }

  window.iotboard.setModel(model);
}();