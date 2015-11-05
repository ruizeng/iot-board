/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    template.helper("$splitNumber", function(num, decimal) {
        var result = [ 0, 0 ];
        return result[0] = Math.floor(num), result[1] = Math.round(num * Math.pow(10, decimal)) % Math.pow(10, decimal), 
        result;
    }), /*v:3*/
    template("air", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="preview"> <div class="air-wrap"> <div class="progress-circle-outer animate"> </div> <div class="progress-circle-inner"> <span class="number mark">', 
        $out += $escape(status[0]), $out += '</span> <span class="unit">ppm</span> </div> </div> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:4*/
    template("text", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="text">', $out += $escape(status.text), $out += "</div>", new String($out);
    }), /*v:1*/
    template("temperature", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, title = $data.title, $escape = $utils.$escape, status = $data.status, $splitNumber = $helpers.$splitNumber, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="container"> <div class="de"> <div class="den"> <div class="dene"> <div class="denem"> <div class="deneme"> <w class="temmperature-text">', 
        "-" != status[0] && ($out += $escape($splitNumber(status[0], 1)[0])), $out += "</w> <span>", 
        "-" != status[0] && ($out += ".", $out += $escape($splitNumber(status[0], 1)[1])), 
        $out += '</span> <strong>&deg;</strong> </div> </div> </div> </div> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:4*/
    template("pm25", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return $out += " ", title && ($out += ' <div class="title">', $out += $escape(title), 
        $out += "</div> "), $out += ' </div> <div class="container"> <div class="progress-circle-container"> <div class="progress-circle-outer animate"> </div> <div class="progress-circle-inner"> <span class="number pm25">', 
        $out += $escape(status[0]), $out += '</span> <span class="unit">ug/m3</span> </div> </div> </div> <div class="clf"></div> ', 
        new String($out);
    }), /*v:4*/
    template("plug", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), title = $data.title, status = $data.status, cnt = $data.cnt, $out = "";
        return $out += '<div class="plug-title">', $out += $escape(title), $out += '</div> <div class="plug-wrap"> <input type="checkbox" class="slider-v1" ', 
        $out += $escape(status[0] ? "checked" : ""), $out += ' id="autogen-plug-', $out += $escape(cnt), 
        $out += '" /> <label for="autogen-plug-', $out += $escape(cnt), $out += '"></label> </div> <div class="clf"></div> </script> <script type="text/html" id="template-text"> ', 
        title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        new String($out);
    }), /*v:7*/
    template("humiture", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, title = $data.title, $escape = $utils.$escape, status = $data.status, $splitNumber = $helpers.$splitNumber, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="colorpicker"> </div> <div class="preview"> <div class="container"> <div class="de"> <div class="den humiture"> <div class="dene"> <div class="denem"> <div class="deneme humiture-wrap"><w class="humiture-text">', 
        "-" != status[0] && ($out += $escape($splitNumber(status[0], 1)[0])), $out += '</w><span></span><strong>%</strong> </div> </div> </div> </div> </div> </div> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:20*/
    template("motor", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="motor"> <div class="range-wrap"> <label for="range"> <input type="range" name="range" id="range" min="-128" max="127" step="1" value="', 
        $out += $escape(status[0]), $out += '" class="motor-range"/> </label> </div> <span class="motor-speed">', 
        $out += $escape(status[0]), $out += '</span><button class="btn-reset">RESET</button> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:12*/
    template("led", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="colorpicker"> <canvas class="picker" width="200" height="200"></canvas> </div> <div class="preview"> <div> <label>R</label> <input type="text" class="rPrev" style="background-color:rgba(', 
        $out += $escape(status[0]), $out += ',0,0,1)"/> </div> <div> <label>G</label> <input type="text" class="gPrev" style="background-color:rgba(0,', 
        $out += $escape(status[1]), $out += ',0,1)"/> </div> <div> <label>B</label> <input type="text" class="bPrev" style="background-color:rgba(0,0,', 
        $out += $escape(status[2]), $out += ',1)"/> </div> </div> <div class="clf"></div> <div class="controls"> <input type="hidden" class="rVal" value="', 
        $out += $escape(status[0]), $out += '"/> <input type="hidden" class="gVal" value="', 
        $out += $escape(status[1]), $out += '"/> <input type="hidden" class="bVal" value="', 
        $out += $escape(status[2]), $out += '"/> </div> <span class="btn btn-refresh">REFRESH</span> <span class="btn btn-set">SET</span> <div class="clf"></div>', 
        new String($out);
    }), /*v:12*/
    template("default", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, label = $data.label, i = $data.i, config = $data.config, status = $data.status, $out = "";
        title && ($out += ' <div class="title">', $out += $escape(title), $out += "-", $out += $escape(label), 
        $out += "</div> "), $out += " ";
        for (var i in config) $out += ' <div class="default-status-wrap"> <div class="default-status-name">', 
        $out += $escape(config[i].name), $out += '</div> <div class="default-status-input-wrap"> <input class="default-status-input" placeholder="空" value="', 
        $out += $escape(status[i]), $out += '"> </div> </div> ';
        return $out += ' <span class="btn btn-refresh">REFRESH</span> <span class="btn btn-set">SET</span> <div class="clf"></div>', 
        new String($out);
    });
}();