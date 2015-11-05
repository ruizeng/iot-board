!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='pm25';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        on: dom.find(".pm25").val()
      }
    },
  });
}();
