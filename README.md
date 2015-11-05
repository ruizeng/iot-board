# iot-board
An HTML5 ui framework to build web based IOT user interface.

## demo
[smart phone](http://pandocloud.github.io/iot-board/index-demo.html)

## features
* build your own iot interface with minimum code.
* pluggable widgets.
* can implement your our models to provide data sources for widgets.
* automatic event binding and dom manipulation.
* can define custom widgets.

## usage
``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IOT Board</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />

  <!-- add iotboard common css and js in the first place -->
  <link rel="stylesheet" href="iotboard.min.css" media="screen" type="text/css" />
  <script src="iotboard.min.js"></script>

  <!-- add widgets css and js files here -->
  <link rel="stylesheet" href="widgets/text/text.widget.min.css" media="screen" type="text/css" />
  <script src="widgets/text/text.widget.min.js"></script>

  <link rel="stylesheet" href="widgets/switch/switch.widget.min.css" media="screen" type="text/css" />
  <script src="widgets/switch/switch.widget.min.js"></script>

  <link rel="stylesheet" href="widgets/led/led.widget.min.css" media="screen" type="text/css" />
  <script src="widgets/led/led.widget.min.js"></script>
  <!-- -->

  <!-- model to use here -->
  <script src="models/dummy.model.min.js"></script>
  <!-- -->
</head>
<body>
  <!-- add a widget to board -->
  <div class="widget" iotb-widget="text" data-label="text1" data-title="随意"></div>
  <div class="widget" iotb-widget="text" data-label="text2" data-title="hell"></div>

  <!-- add a widget to board -->
  <div class="widget" iotb-widget="switch" data-label="switch1" data-title="开关1"></div>
  <div class="widget" iotb-widget="switch" data-label="switch2" data-title="开关2"></div>

  <!-- add a widget to board -->
  <div class="widget" iotb-widget="led" data-label="led" data-title="灯泡"></div>
</body>
</html>
```

simply add a div to html file to add a widget to board. like bellow:

``` html
<div class="widget" iotb-widget="switch" data-label="switch2" data-title="开关2"></div>
```

requirements:

* div must have "widget" class
* must have a iotb-widget attribute which specify the widget to add
* must have a data-label attribute to distinguish the widget
* can have a data-title attribute to give the widget a title(optional)

## define your own model
**model** is a data source providor to perform data read & write for widget. You can define your own model and include the model js file in the html file to set the board's data providor.
``` html
  <!-- model to use here -->
  <script src="models/dummy.model.min.js"></script>
  <!-- -->
``` 
example model:
``` javascript
!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var model = {};

  /**
   * called when widget's status is changed by user interaction.
   * @param  {String} widget [the widget name]
   * @param  {String} label  [the widget label to distinguish different widget of same type/name]
   * @param  {Object} status [the new status of widget]
   * @return {None}
   */
  model.onWidgetStatusChanged = function(widget, label, status){
    switch(widget){
      case "text":
        console.log(status.text);
        break;
      case "switch":
        console.log("switch status changed:" + label);
        console.log(JSON.stringify(status));
        break;
      case "led":
        console.log("led status changed:" + label);
        console.log(JSON.stringify(status));
        break;
      default:
        console.log("widget {" + widget + "}" + " handler not found!");
        break;
    }
  }

  /**
   * get widget current status from data providor.
   * @param  {String} widget [the widget name]
   * @param  {String} label  [the widget label to distinguish different widget of same type/name]
   * @param  {callback} callback [the result status will be passed through callback(status)]
   * @return {None}
   */
  model.getCurrentStatus = function(widget, label, callback) {
    switch(widget){
      case "text":
        callback({
          text: "status changed:" + (new Date())
        })
        break;
      case "switch": 
        callback({
          on: Math.floor(Math.random()*100)%2 == 0? true: false
        });
        break;
      case "led":
        callback({
          red: Math.floor(Math.random()*256),
          green: Math.floor(Math.random()*256),
          blue: Math.floor(Math.random()*256),
          freq: Math.round(Math.random()*1000),
          white: Math.floor(Math.random()*256),
        });
        break;
      default:
        console.log("widget {" + widget + "}" + " handler not found!");
        break;
    }
  }

  // set the board's model
  window.iotboard.setModel(model);
}();
```

## define a new widget
you can define your custom **widget** too. 
``` javascript
window.iotboard.defineWidget("your_widget_name", widget_config);
```
###### available widget_config option keys:
* status: 
required. status is a js object to declare the actual data of widget.
``` javascript
status: {
      red: 255,
      green: 255,
      blue: 255,
      freq: 100,
      white: 100
    }
```
* render: required. a function returns a html string for dom rending. the widget container's dataset is passed to the render function.

``` javascript
render: function(dataset){
      return '<div class="title">' + dataset.title + '</div>' 
        + '<div class="text">' + this.status.text + '</div>';
    }
```

* listeners: optional. automaic event listener for user interaction.
``` javascript
listeners: [
      {
        selector: ".text", // jquery style selector in widget dom
        event: "click", // event to fire
        behavior: "set" // tell model to update data
      },
      {
        selector: ".title", // 
        event: "click", //
        behavior: "get" // refresh ui from data source
      }
    ]

```

* parseStatus: required. a helper function to read status from widget's dom element.
``` javascript
parseStatus: function(dom){
      return {
        text: dom.find(".text").html()
      }
    }
```

* onRendered: optional. a function to call when widget dom has been rendered.
``` javascript
onRendered: function(dom){
      console.log("on widget rendered.");
      dom.find('.freqCtrl').change(function(){
          $(this).closest(".controls").find(".freqVal").text($(this).val());
      });
  
      dom.find('.wCtrl').change(function(){
          $(this).closest(".controls").find(".wVal").text($(this).val());
      });
  });
```
 

