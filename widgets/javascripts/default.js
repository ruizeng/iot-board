!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='default';
  window.iotboard.defineWidget(widgetName, {
    status: [],
    config: [],
    render: function(dataset){
      console.log(dataset);
      dataset.status = this.status;
      dataset.config = JSON.parse(dataset.config);
      this.config = dataset.config;
      return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".btn-set",
        event: "click",
        behavior: "set"
      },
      {
        selector: ".btn-refresh",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
    var res=[];
    var conf = this.config;
    dom.find('.default-status-wrap').each(function(i){
      var value = $(this).find('.default-status-input').val();
      switch (conf[i].value_type){
        case 1:
        case 2:
          value = parseFloat(value);
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 13:
          value = parseInt(value);
          break;
        case 11:
        case 12:
          value = value + "";
          break;
        default:
          console.log("unkown value type: " + conf[i].value_type);
          break
      }
      res.push(value);
    });
    return res;
  },
  });
}();
