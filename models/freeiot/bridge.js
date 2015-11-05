//==========================pandoJSBridge===============
window.initFreeIOTJSBridge = function(){
  var DEBUG = false;
    if (window.PandoJSBridge) { return ;}
    var messagingIframe;
    var sendMessageQueue = [];
    var messageHandlers = {};

    var CUSTOM_PROTOCOL_SCHEME = 'pando';
    var responseCallbacks = {};
    var uniqueId = 1;

    function _createQueueReadyIframe(doc) {
        console.log("createQueueReadyIframe...");
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }


    //set default messageHandler
    function init(messageHandler) {
        if (PandoJSBridge._messageHandler) { 
          return;
          // throw new Error('PandoJSBridge.init called twice'); 
        }
        PandoJSBridge._messageHandler = messageHandler;
        if (DEBUG) {
          console.log("init... ");
        };
        
    }

    function isAndroid(){
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("android") > -1;
    }

    function isIOS() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("iphone") > -1 || ua.indexOf("ios") > -1
    }

    function send(data, responseCallback) {
        _doSend({ data:data }, responseCallback);
    }

    function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
    }

    function callHandler(handlerName, data, responseCallback) {
        _doSend({ handlerName:handlerName, data:data }, responseCallback);
    }

    //sendMessage add message, 触发native处理 sendMessage
    function _doSend(message, responseCallback) {
        if (responseCallback) {
            var callbackId = 'cb_'+(uniqueId++)+'_'+new Date().getTime();
            responseCallbacks[callbackId] = responseCallback;
            message['callbackId'] = callbackId;
        }
        sendMessageQueue.push(message);
        var messageQueueString = Base64.encode(JSON.stringify(sendMessageQueue));
        sendMessageQueue = [];

        var newUrl = CUSTOM_PROTOCOL_SCHEME + '://invoke/' + messageQueueString;
        if (DEBUG) {
          console.log(newUrl);
        };
        
        if (isIOS()) {
            messagingIframe.src = newUrl;
        } else if (isAndroid()) {
            alert(encodeURI(newUrl));
        } else {
            messagingIframe.src = newUrl;
        }
        
    }


    //提供给native调用
    function _handleMessageFromNative(messageJSON) {
        if (DEBUG) {
            console.log("handleMessageFromNative..." + messageJSON);
        };
        
        setTimeout(
            function _timeoutdispatchMessageFromNative() {
            if (DEBUG) {
              console.log(messageJSON);
            };
            
            messageJSON = Base64.decode(messageJSON);
            var message = JSON.parse(messageJSON);

            var messageHandler;
            //回调
            if (DEBUG) {
              console.log("message.responseId =>" + message.responseId);
            };
            if (message.responseId) {

                var responseCallback = responseCallbacks[message.responseId];
                if (!responseCallback) {
                    return;
                }

                responseCallback(message.responseData);
                delete responseCallbacks[message.responseId];
            }

        }
        , 0)
    }

    window.OnPandoJSBridgeReady = function(callback){
        if (window.PandoJSBridge) {
            console.log("has PandoJSBridge...");
            callback(PandoJSBridge)
        } else {
            console.log("PandoJSBridge not init...");
            document.addEventListener('PandoJSBridgeReady',
            function() {
                callback(PandoJSBridge)
            },
            false)
        }
    }

    window.PandoJSBridge = {
        init: init,
        send: send,
        registerHandler: registerHandler,
        callHandler: callHandler,
        _handleMessageFromNative: _handleMessageFromNative
    };

    var doc = document;
    _createQueueReadyIframe(doc);
    var readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('PandoJSBridgeReady');
    readyEvent.bridge = PandoJSBridge;
    doc.dispatchEvent(readyEvent);

    window.pando = {};
    window.pando.getDeviceStatus = function(responseCallback) {
        callHandler('currentStatus', {}, responseCallback);
    };
    window.pando.sendCommand = function(data, responseCallback) {
        callHandler('sendCommand', data, responseCallback);
    };
    window.pando.getCurrentStatus = function(responseCallback) {
        callHandler('getCurrentStatus', {}, responseCallback);
    };
    window.pando.setCurrentStatus = function(responseCallback) {
        callHandler('setCurrentStatus', data, responseCallback);
    }
}





