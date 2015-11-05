!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName = "text";
  window.iotboard.defineWidget(widgetName, {
    status: ["loading..."],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".text",
        event: "click",
        behavior: "set"
      },
      {
        selector: ".title",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
      return {
        text: dom.find(".text").html()
      }
    },
  });

  console.log("add widget {text}");
}();
