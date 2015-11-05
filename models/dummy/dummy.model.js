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
    console.log("widget {" + widget + "} status changed:" + label);
    console.log(JSON.stringify(status));
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
        setTimeout(function(){
          callback({
            on: Math.floor(Math.random()*100)%2 == 0? true: false
          });
        }, 1000);
        break;
      case "led":
        setTimeout(function(){
          callback([Math.floor(Math.random()*256),
            Math.floor(Math.random()*256),
            Math.floor(Math.random()*256)]
            );
        }, 1000);
        break;
      case "atmosphere":
        setTimeout(function(){
          callback({
            temperature: 30.3,
            humidity: 45.1,
            pm25: 56.6
          });
        }, 1000);
        break;
      case "temperature":
      case "humiture":
        setTimeout(function(){
          callback([33.33333]);
        }, 1000);
        break;
      case "pm25":
      case "air":
        setTimeout(function(){
          callback([345]);
        }, 1000);
        break;
      case "motor":
        setTimeout(function(){
          callback([8]);
        }, 1000);
        break;
      case "default":
        setTimeout(function(){
          callback([1,2, 3.3]);
        }, 1000);
        break;
      default:
        console.log("widget {" + widget + "}" + " handler not found!");
        break;
    }
  }

  window.iotboard.setModel(model);
}();