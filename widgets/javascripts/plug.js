!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var cnt = 0;

  var widgetName = "plug";
  window.iotboard.defineWidget(widgetName, {
    status: [0],
    render: function(dataset){
      cnt ++;
      dataset.status=this.status;
      dataset.cnt=cnt;
      return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".plug-wrap label",
        event: "click",
        behavior: "set"
      }
    ],
    parseStatus: function(dom){
      return [dom.find(".slider-v1").is( ":checked" )?0:1];
    }
  });

  console.log("add widget {plug}");
}();
