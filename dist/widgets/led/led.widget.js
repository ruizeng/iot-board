!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  window.iotboard.defineWidget("led", {
    status: {
      red: 255,
      green: 255,
      blue: 255,
      freq: 100,
      white: 100
    },
    render: function(dataset){
      return (dataset.title?'<div class="title">' + dataset.title + '</div>':'')
           + '<div class="colorpicker">'
           + '<canvas class="picker" width="200" height="200"></canvas>'
           + '</div>'
           + '<div class="preview">'
           + '<div><label>R</label> <input type="text" class="rPrev" style="background-color:#'+this.status["red"].toString(16)+'0000"/></div>'
           + '<div><label>G</label> <input type="text" class="gPrev" style="background-color:#00'+this.status["red"].toString(16)+'00"/></div>'
           + '<div><label>B</label> <input type="text" class="bPrev" style="background-color:#0000'+this.status["red"].toString(16)+'"/></div>'
           + '</div><div class="clf"></div>'
           + '<div class="controls">'
           + '<input type="hidden" class="rVal" value="'+this.status["red"]+'"/>'
           + '<input type="hidden" class="gVal" value="'+this.status["green"]+'"/>'
           + '<input type="hidden" class="bVal" value="'+this.status["blue"]+'"/>'
           + '<div><label>Freq(<span class="freqVal">'+this.status["freq"]+'</span>)</label>'
           + '<input type="range" class="freqCtrl" min="1" max="1000" value="'+this.status["freq"]+'"/></div>'
           + '<div><label>W(<span class="wVal">'+this.status["white"]+ '</span>)</label>' 
           + '<input type="range" class="wCtrl" min="0" max="255" value="'+this.status["white"]+'"/></div>'
           + '</div>'
           + '<div class="btn btn-refresh">REFRESH</div>'
           + '<div class="btn btn-set">SET</div>'
           + '<div class="clf"></div>'
    },
    listeners: [
      {
        selector: ".btn-refresh",
        event: "click",
        behavior: "get"
      },
      {
        selector: ".btn-set",
        event: "click",
        behavior: "set"
      }
    ],
    parseStatus: function(dom){
      return {
        red: parseInt(dom.find(".rVal").val()),
        green: parseInt(dom.find(".gVal").val()),
        blue: parseInt(dom.find(".bVal").val()),
        freq: parseInt(dom.find(".freqVal").text()),
        white: parseInt(dom.find(".wVal").text())
      }
    },
    onRendered: function(dom){
      console.log("on widget rendered.");
      // create canvas and context objects
      dom.find('.picker').each(function(){
        var ctx = this.getContext('2d');
  
        // drawing active image
        var image = new Image();
        image.onload = function () {
          console.log("color picker loaded...");
          ctx.drawImage(image, 0, 0); // draw the image on the canvas
        }
  
        // select desired colorwheel
        var imageSrc = 'widgets/led/colorwheel.png';
        image.src = imageSrc;
      });
  
      dom.find('.picker').on("click", function(e) { // mouse move handler
        if (true) {
          // get coordinates of current position
          var widget = $(this).closest(".widget");
          var ctx = this.getContext('2d');
          var canvasOffset = $(this).offset();
          var canvasX = Math.floor(e.pageX - canvasOffset.left);
          var canvasY = Math.floor(e.pageY - canvasOffset.top);
  
          // get current pixel
          var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
          var pixel = imageData.data;
  
          // update preview color
          widget.find(".rPrev").css("background-color", "#" + pixel[0].toString(16) + "0000");
          widget.find(".gPrev").css("background-color", "#00" + pixel[1].toString(16) + "00");
          widget.find(".bPrev").css("background-color", "#0000" + pixel[2].toString(16));
  
          // update controls
          widget.find('.rVal').val(pixel[0]);
          widget.find('.gVal').val(pixel[1]);
          widget.find('.bVal').val(pixel[2]);
        }
      });
  
      dom.find('.freqCtrl').change(function(){
          $(this).closest(".controls").find(".freqVal").text($(this).val());
      });
  
      dom.find('.wCtrl').change(function(){
          $(this).closest(".controls").find(".wVal").text($(this).val());
      });
    }
  });

  console.log("add widget {led}");
}();