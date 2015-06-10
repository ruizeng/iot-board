!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  window.iotboard.defineWidget("text", {
    status: {
      text: "loading..."
    },
    render: function(dataset){
      return '<div class="title">' + dataset.title + '</div>' 
        + '<div class="text">' + this.status.text + '</div>';
    },
    listeners: [
      {
        selector: ".text",
        event: "click",
        getStatus: function(dom){
          return {
            text: dom.find(".text").html()
          }
        }
      }
    ]
  });

  console.log("add widget {text}");
}();