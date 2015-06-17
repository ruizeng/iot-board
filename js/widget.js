!function(global){
  global.iotboard = global.iotboard || {};

  /**
   * Object Widget manage the behavour and look of a widget.
   * @param {Object} [dom] [a jQuery/Zepto Dom Selector Object]
   * @param {Object} conf [config]
   */
  function Widget(dom, conf){

    var defaultConf = {

    };

    this.dom = dom;
    var config = $.extend({}, defaultConf, conf);

    var render = function(){
      dom.html(config.render(dom[0].dataset));

      if(config.onRendered){
        config.onRendered(dom);
      }
    }

    Object.defineProperty(this, 'status', {
      get: function(){
        return config.status;
      },
      set: function(newStatus){
        config.status = newStatus;
        render();
      },
      enumerable: true,
      configurable: true
    });

    this.config = config;
    this.render = render;
  }


  window.iotboard.Widget = Widget;
}(window);