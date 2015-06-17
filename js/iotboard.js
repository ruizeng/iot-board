!function(global) {
  global.iotboard = global.iotboard || {};

  var _widgetsConf = {};
  var _model = null;

  /**
   * define a new kind of widget
   * @param {String} name   [the name of the widget, repeated name is not allowed.]
   * @param {Object} widget [the widget object.]
   * @return {bool}         [return true if succeed, false if fail]
  */
  var _defineWidget = function(name, conf) {
    if (_widgetsConf[name]) {
      console.log("fail to define a new widget: name already exists.");
      return false
    }
    _widgetsConf[name] = conf;
  }

  /**
   * [construt a widget object]
   * @param  {Object} dom  [a jQuery/Zepto Dom Selector Object]
   * @param  {String} name [name of widget to be constructed]
   * @return {Object}      [widget object to return, null if failed]
   */
  var _newWidget = function(dom, name) {
    var conf = _widgetsConf[name]
    if (!conf) {
      console.log("widget {"+ name +"}" + " not found!");
      return null
    }
    return new iotboard.Widget(dom, conf);
  }

  /**
   * set a model to iotboard. a model is a data provider of all widgets. 
   * @param {String} model [the model object.]
   * @return {bool}        [true if succeed, false if fail.]
  */
  var _setModel = function(model) {
    if (_model) {
      console.log("only one model can be set in board.");
      return false;
    }
    _model = model;
  }

  /**
   * get the board/s current model.
   * @return {Object}       [the model Object]
   */
  var _getModel = function() {
    return _model;
  }

  $.extend(global.iotboard ,{
    defineWidget : _defineWidget,
    setModel : _setModel,
    newWidget: _newWidget,
    getModel: _getModel
  });
}(window);