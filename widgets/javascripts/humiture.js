!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='humiture';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        humiture:dom.find('.humiture-text').text()
      }
    },
  });
}();
