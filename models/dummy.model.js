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
  model.onStatusChanged = function(widget, label, status){
    switch(widget){
      case "text":
        console.log(status.text);
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
  model.getStatus = function(widget, label, callback) {
    switch(widget){
      case "text":
        callback({
          text: "status changed."
        })
        break;

      default:
        console.log("widget {" + widget + "}" + " handler not found!");
        break;
    }
  }

  window.iotboard.setModel(model);
}();