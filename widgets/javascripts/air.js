!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='air';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        mark: dom.find(".mark").val()
      }
    },
  });
}();
