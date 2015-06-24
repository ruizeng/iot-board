!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  window.iotboard.defineWidget("atmosphere", {
    status: {
      temperature: 0.0,
      humidity: 0.0,
      pm25: 0.0
    },
    render: function(dataset){
      return (dataset.title?('<div class="title">' + dataset.title + '</div>' ): '')
        + '<div class="temperature"> <span class="temperature-val">' +this.status.temperature + '</span> °C</div>'
        + '<div class="humidity"> <span class="humidity-icon"></span><span class="humidity-val">' + this.status.humidity + '</span>%</div>'
        + '<div class="pm25"><span class="pm25-icon"></span><span class="pm25-val">' + this.status.pm25 + '</span></div>';
    }
  });

  console.log("add widget {atmosphere}");
}();