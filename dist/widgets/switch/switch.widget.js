!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var cnt = 0;

  window.iotboard.defineWidget("switch", {
    status: {
      on: false
    },
    render: function(dataset){
      cnt ++;
      return '<div class="switch-title">' + dataset.title + '</div>'
            + '<div class="switch-wrap">'
            + '<input type="checkbox" class="slider-v1" '+ (this.status["on"]?'checked':'') +' id="autogen-s' + cnt + '" />'
            + '<label for="autogen-s'+ cnt + '"></label>'
            + '</div><div class="clf"></div>';
    },
    listeners: [
      {
        selector: ".switch-wrap",
        event: "click",
        behavior: "set"
      },
      {
        selector: ".switch-title",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
      return {
        on: dom.find(".slider-v1").is( ":checked" )
      }
    },
  });

  console.log("add widget {switch}");
}();